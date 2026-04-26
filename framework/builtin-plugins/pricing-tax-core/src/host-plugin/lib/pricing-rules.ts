/** Pricing Rule engine.
 *
 *  Rules are matched against a "context" — { itemCode, itemGroup,
 *  customerId, customerGroup, territory, qty, postingDate, currency }
 *  — and return either:
 *    - a percentage discount,
 *    - a fixed-amount discount,
 *    - a hard rate override.
 *
 *  Multiple rules may match a context; the engine picks the highest-
 *  priority enabled rule. Ties broken by most-recently-updated.
 *  filters are stored as JSON; missing filter fields = match-anything.
 *
 *  applyToLine() takes an unrolled line { rateMinor, qty, ... } and
 *  returns the *adjusted* rateMinor + a discount delta, plus a
 *  trace of which rule won. The caller is responsible for substituting
 *  the new rate into the invoice line.
 */

import { db, nowIso } from "@gutu-host";
import { uuid } from "@gutu-host";

export interface PricingFilters {
  itemCode?: string;
  itemGroup?: string;
  customerId?: string;
  customerGroup?: string;
  territory?: string;
  minQty?: number;
  maxQty?: number;
  validFrom?: string;
  validTo?: string;
}

export type PricingAction = "discount-pct" | "discount-amount" | "set-rate";

export interface PricingRule {
  id: string;
  tenantId: string;
  name: string;
  priority: number;
  filters: PricingFilters;
  action: PricingAction;
  valuePct: number | null;
  valueMinor: number | null;
  currency: string;
  enabled: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingContext {
  itemCode?: string;
  itemGroup?: string;
  customerId?: string;
  customerGroup?: string;
  territory?: string;
  qty?: number;
  postingDate?: string;
  currency?: string;
}

export class PricingError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "PricingError";
  }
}

interface Row {
  id: string;
  tenant_id: string;
  name: string;
  priority: number;
  filters: string;
  action: PricingAction;
  value_pct: number | null;
  value_minor: number | null;
  currency: string;
  enabled: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

function rowToRule(r: Row): PricingRule {
  let filters: PricingFilters = {};
  try {
    filters = JSON.parse(r.filters) as PricingFilters;
  } catch { /* tolerate */ }
  return {
    id: r.id,
    tenantId: r.tenant_id,
    name: r.name,
    priority: r.priority,
    filters,
    action: r.action,
    valuePct: r.value_pct,
    valueMinor: r.value_minor,
    currency: r.currency,
    enabled: r.enabled === 1,
    createdBy: r.created_by,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export interface CreateRuleArgs {
  tenantId: string;
  name: string;
  priority?: number;
  filters: PricingFilters;
  action: PricingAction;
  valuePct?: number;
  valueMinor?: number;
  currency?: string;
  enabled?: boolean;
  createdBy: string;
}

export function createPricingRule(args: CreateRuleArgs): PricingRule {
  if (!args.name) throw new PricingError("invalid", "Name required");
  if (!["discount-pct", "discount-amount", "set-rate"].includes(args.action))
    throw new PricingError("invalid-action", `Unknown action "${args.action}"`);
  if (args.action === "discount-pct") {
    if (args.valuePct == null || args.valuePct < 0 || args.valuePct > 100)
      throw new PricingError("invalid-value", "discount-pct requires valuePct in [0,100]");
  } else {
    if (args.valueMinor == null)
      throw new PricingError("invalid-value", `${args.action} requires valueMinor`);
  }
  const id = uuid();
  const now = nowIso();
  db.prepare(
    `INSERT INTO pricing_rules
       (id, tenant_id, name, priority, filters, action, value_pct, value_minor, currency,
        enabled, created_by, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    args.tenantId,
    args.name,
    args.priority ?? 0,
    JSON.stringify(args.filters ?? {}),
    args.action,
    args.valuePct ?? null,
    args.valueMinor ?? null,
    args.currency ?? "USD",
    args.enabled === false ? 0 : 1,
    args.createdBy,
    now,
    now,
  );
  return getPricingRule(args.tenantId, id)!;
}

export function getPricingRule(tenantId: string, id: string): PricingRule | null {
  const r = db
    .prepare(`SELECT * FROM pricing_rules WHERE id = ? AND tenant_id = ?`)
    .get(id, tenantId) as Row | undefined;
  return r ? rowToRule(r) : null;
}

export function listPricingRules(tenantId: string): PricingRule[] {
  const rows = db
    .prepare(
      `SELECT * FROM pricing_rules WHERE tenant_id = ?
         ORDER BY priority DESC, updated_at DESC`,
    )
    .all(tenantId) as Row[];
  return rows.map(rowToRule);
}

export function updatePricingRule(
  tenantId: string,
  id: string,
  patch: Partial<Omit<CreateRuleArgs, "tenantId" | "createdBy">>,
): PricingRule | null {
  const existing = getPricingRule(tenantId, id);
  if (!existing) return null;
  const fields: string[] = [];
  const params: unknown[] = [];
  if (patch.name !== undefined) { fields.push("name = ?"); params.push(patch.name); }
  if (patch.priority !== undefined) { fields.push("priority = ?"); params.push(patch.priority); }
  if (patch.filters !== undefined) { fields.push("filters = ?"); params.push(JSON.stringify(patch.filters)); }
  if (patch.action !== undefined) { fields.push("action = ?"); params.push(patch.action); }
  if (patch.valuePct !== undefined) { fields.push("value_pct = ?"); params.push(patch.valuePct); }
  if (patch.valueMinor !== undefined) { fields.push("value_minor = ?"); params.push(patch.valueMinor); }
  if (patch.currency !== undefined) { fields.push("currency = ?"); params.push(patch.currency); }
  if (patch.enabled !== undefined) { fields.push("enabled = ?"); params.push(patch.enabled ? 1 : 0); }
  if (fields.length === 0) return existing;
  fields.push("updated_at = ?");
  params.push(nowIso());
  params.push(id);
  db.prepare(`UPDATE pricing_rules SET ${fields.join(", ")} WHERE id = ?`).run(...params);
  return getPricingRule(tenantId, id);
}

export function deletePricingRule(tenantId: string, id: string): boolean {
  const r = db.prepare(`DELETE FROM pricing_rules WHERE id = ? AND tenant_id = ?`).run(id, tenantId);
  return r.changes > 0;
}

/* ----------------------------- Match + apply ----------------------------- */

function matches(rule: PricingRule, ctx: PricingContext): boolean {
  const f = rule.filters;
  if (f.itemCode && f.itemCode !== ctx.itemCode) return false;
  if (f.itemGroup && f.itemGroup !== ctx.itemGroup) return false;
  if (f.customerId && f.customerId !== ctx.customerId) return false;
  if (f.customerGroup && f.customerGroup !== ctx.customerGroup) return false;
  if (f.territory && f.territory !== ctx.territory) return false;
  const qty = ctx.qty ?? 0;
  if (f.minQty != null && qty < f.minQty) return false;
  if (f.maxQty != null && qty > f.maxQty) return false;
  if (f.validFrom && ctx.postingDate && ctx.postingDate < f.validFrom) return false;
  if (f.validTo && ctx.postingDate && ctx.postingDate > f.validTo) return false;
  if (rule.currency && ctx.currency && rule.currency !== ctx.currency) return false;
  return true;
}

/** Pick the best-matching enabled rule for a context. */
export function pickRule(tenantId: string, ctx: PricingContext): PricingRule | null {
  const rules = listPricingRules(tenantId).filter((r) => r.enabled && matches(r, ctx));
  if (rules.length === 0) return null;
  // sorted: priority DESC, updated_at DESC by listPricingRules
  return rules[0]!;
}

export interface ApplyResult {
  ruleId: string | null;
  ruleName: string | null;
  originalRateMinor: number;
  effectiveRateMinor: number;
  discountMinor: number;       // total currency saved on this line
  discountPct: number;         // helpful for UI
}

/** Apply matching pricing to one line's pre-tax rate. */
export function applyPricing(args: {
  tenantId: string;
  ctx: PricingContext;
  rateMinor: number;            // catalog rate per unit
  qty: number;
}): ApplyResult {
  const rule = pickRule(args.tenantId, { ...args.ctx, qty: args.qty });
  if (!rule) {
    return {
      ruleId: null,
      ruleName: null,
      originalRateMinor: args.rateMinor,
      effectiveRateMinor: args.rateMinor,
      discountMinor: 0,
      discountPct: 0,
    };
  }
  let effective = args.rateMinor;
  if (rule.action === "discount-pct" && rule.valuePct != null) {
    effective = Math.round(args.rateMinor * (1 - rule.valuePct / 100));
  } else if (rule.action === "discount-amount" && rule.valueMinor != null) {
    effective = Math.max(0, args.rateMinor - rule.valueMinor);
  } else if (rule.action === "set-rate" && rule.valueMinor != null) {
    effective = rule.valueMinor;
  }
  const discountPerUnit = args.rateMinor - effective;
  return {
    ruleId: rule.id,
    ruleName: rule.name,
    originalRateMinor: args.rateMinor,
    effectiveRateMinor: effective,
    discountMinor: Math.round(discountPerUnit * args.qty),
    discountPct:
      args.rateMinor > 0 ? Number(((discountPerUnit / args.rateMinor) * 100).toFixed(4)) : 0,
  };
}
