/** Pricing Rules REST API.
 *
 *  Routes:
 *    GET    /                  list rules
 *    POST   /                  create
 *    GET    /:id               fetch one
 *    PATCH  /:id               update
 *    DELETE /:id               delete
 *    POST   /apply             apply pricing to a context (body: { rateMinor, qty, ctx })
 */

import { Hono } from "@gutu-host";
import { requireAuth, currentUser } from "@gutu-host";
import { getTenantContext } from "@gutu-host";
import {
  PricingError,
  applyPricing,
  createPricingRule,
  deletePricingRule,
  getPricingRule,
  listPricingRules,
  updatePricingRule,
} from "@gutu-plugin/pricing-tax-core";

export const pricingRuleRoutes = new Hono();
pricingRuleRoutes.use("*", requireAuth);

function tenantId(): string {
  return getTenantContext()?.tenantId ?? "default";
}

function handle(err: unknown, c: Parameters<Parameters<typeof pricingRuleRoutes.get>[1]>[0]) {
  if (err instanceof PricingError) return c.json({ error: err.message, code: err.code }, 400);
  throw err;
}

pricingRuleRoutes.get("/", (c) => c.json({ rows: listPricingRules(tenantId()) }));

pricingRuleRoutes.get("/:id", (c) => {
  const r = getPricingRule(tenantId(), c.req.param("id"));
  if (!r) return c.json({ error: "not found" }, 404);
  return c.json(r);
});

pricingRuleRoutes.post("/", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const user = currentUser(c);
  try {
    const r = createPricingRule({
      tenantId: tenantId(),
      name: String(body.name ?? ""),
      priority: typeof body.priority === "number" ? body.priority : 0,
      filters: (body.filters as never) ?? {},
      action: (body.action as never) ?? "discount-pct",
      valuePct: typeof body.valuePct === "number" ? body.valuePct : undefined,
      valueMinor: typeof body.valueMinor === "number" ? body.valueMinor : undefined,
      currency: typeof body.currency === "string" ? body.currency : undefined,
      enabled: body.enabled !== false,
      createdBy: user.email,
    });
    return c.json(r, 201);
  } catch (err) {
    return handle(err, c) as never;
  }
});

pricingRuleRoutes.patch("/:id", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as never;
  try {
    const r = updatePricingRule(tenantId(), c.req.param("id"), body);
    if (!r) return c.json({ error: "not found" }, 404);
    return c.json(r);
  } catch (err) {
    return handle(err, c) as never;
  }
});

pricingRuleRoutes.delete("/:id", (c) => {
  const ok = deletePricingRule(tenantId(), c.req.param("id"));
  if (!ok) return c.json({ error: "not found" }, 404);
  return c.json({ ok: true });
});

pricingRuleRoutes.post("/apply", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const out = applyPricing({
    tenantId: tenantId(),
    ctx: (body.ctx as never) ?? {},
    rateMinor: Number(body.rateMinor ?? 0),
    qty: Number(body.qty ?? 1),
  });
  return c.json(out);
});
