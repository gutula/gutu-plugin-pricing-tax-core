# Pricing & Tax Core Developer Guide

Shared price lists, discount rules, tax determination, withholding rules, and commercial policy precedence for every order and billing flow.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Maintains shared pricing, discount, tax, and commercial-policy rules so order, billing, and procurement flows evaluate policy from one governed source.

### This plugin is the right fit when

- You need **price policies**, **tax rules**, **commercial evaluation** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/pricing-tax-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/pricing-tax-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/pricing-tax-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/pricing-tax-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/pricing-tax-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/pricing-tax-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/pricing-tax-core` |
| Manifest ID | `pricing-tax-core` |
| Display Name | Pricing & Tax Core |
| Domain Group | Operational Data |
| Default Category | Business / Pricing & Tax |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `product-catalog-core` |
| Recommended Plugins | `sales-core`, `procurement-core`, `accounting-core` |
| Capability Enhancing | `pos-core`, `subscriptions-core`, `e-invoicing-core` |
| Integration Only | `business-portals-core` |
| Suggested Packs | `localization-global-base`, `localization-india`, `localization-united-states` |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.pricing`, `events.publish.pricing` |
| Provides Capabilities | `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies` |
| Owns Data | `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`, `pricing.payment-terms` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `pricing.price-lists.publish` | Permission: `pricing.price-lists.write` | Publish Price List<br>Idempotent<br>Audited |
| Action | `pricing.tax-rules.publish` | Permission: `pricing.tax-rules.write` | Publish Tax Rules<br>Non-idempotent<br>Audited |
| Action | `pricing.policies.evaluate` | Permission: `pricing.commercial-policies.read` | Evaluate Commercial Policy<br>Non-idempotent<br>Audited |
| Action | `pricing.price-lists.hold` | Permission: `pricing.price-lists.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `pricing.price-lists.release` | Permission: `pricing.price-lists.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `pricing.price-lists.amend` | Permission: `pricing.price-lists.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `pricing.price-lists.reverse` | Permission: `pricing.price-lists.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `pricing.price-lists` | Portal disabled | Versioned price lists, discount rules, and commercial overrides.<br>Purpose: Keep commercial demand and procurement policy evaluation consistent across the suite.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `pricing.tax-rules` | Portal disabled | Tax categories, jurisdiction rules, and withholding configurations.<br>Purpose: Provide one shared tax-determination layer instead of burying fiscal logic in every plugin.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `pricing.commercial-policies` | Portal disabled | Rounding, precedence, payment terms, and segment-specific pricing policies.<br>Purpose: Make commercial decision logic visible, configurable, and packable.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `pricing.projections.refresh` | `pricing-projections` | Retry policy not declared | No timeout declared |
| `pricing.reconciliation.run` | `pricing-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `pricing-policy-lifecycle` | `pricing-analyst`, `finance`, `approver` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep tax and pricing changes reviewable before they affect live demand or financial flows. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `pricing.projections.refresh`, `pricing.reconciliation.run`.
- Workflow surface: `pricing-policy-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/pricing-tax-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/pricing-tax-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["pricing.price-lists.publish"]
  action --> validation["Schema + permission guard"]
  validation --> service["Pricing & Tax Core service layer"]
  service --> state["pricing.price-lists"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, publishPriceListAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/pricing-tax-core";

export const pluginSurface = {
  manifest,
  publishPriceListAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, publishPriceListAction } from "@plugins/pricing-tax-core";

console.log("plugin", manifest.id);
console.log("action", publishPriceListAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `pricing.price-lists.publish`, `pricing.tax-rules.publish`, `pricing.policies.evaluate`, `pricing.price-lists.hold`, `pricing.price-lists.release`, `pricing.price-lists.amend`, `pricing.price-lists.reverse`.
- Owns 3 resource contracts: `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 6 owned entity surface(s): `Price List`, `Pricing Rule`, `Tax Rule`, `Commercial Policy`, `Payment Terms Template`, `Withholding Policy`.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Accounts`, `Selling`, `Buying`, `Stock`.
- Operational scenario matrix includes `price-list-publication`, `quote-pricing-evaluation`, `tax-determination-and-withholding`.
- Governs 4 settings or policy surface(s) for operator control and rollout safety.

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Add richer precedence, localization, and approval evidence where pricing and tax changes start driving live operations.
- Clarify override, promotion, and withholding flows before sector packs build on the pricing layer.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Price List`, `Item Price`, `Pricing Rule`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
