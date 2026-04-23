# Pricing & Tax Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Shared price lists, discount rules, tax determination, withholding rules, and commercial policy precedence for every order and billing flow.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Pricing & Tax |
| Primary focus | price policies, tax rules, commercial evaluation |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Maintains shared pricing, discount, tax, and commercial-policy rules so order, billing, and procurement flows evaluate policy from one governed source.

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

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Pricing & Tax**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/pricing-tax-core` |
| Manifest ID | `pricing-tax-core` |
| Repo | [gutu-plugin-pricing-tax-core](https://github.com/gutula/gutu-plugin-pricing-tax-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `product-catalog-core` |
| Recommended Plugins | `sales-core`, `procurement-core`, `accounting-core` |
| Capability Enhancing | `pos-core`, `subscriptions-core`, `e-invoicing-core` |
| Integration Only | `business-portals-core` |
| Suggested Packs | `localization-global-base`, `localization-india`, `localization-united-states` |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.pricing`, `events.publish.pricing` |
| Provided Capabilities | `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Installation Guidance

- Required plugins: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `product-catalog-core`
- Recommended plugins: `sales-core`, `procurement-core`, `accounting-core`
- Capability-enhancing plugins: `pos-core`, `subscriptions-core`, `e-invoicing-core`
- Integration-only plugins: `business-portals-core`
- Suggested packs: `localization-global-base`, `localization-india`, `localization-united-states`
- Standalone supported: yes
- Install with Accounting for production-grade statutory and settlement behavior.

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `pricing.price-lists.publish`, `pricing.tax-rules.publish`, `pricing.policies.evaluate`, `pricing.price-lists.hold`, `pricing.price-lists.release`, `pricing.price-lists.amend`, `pricing.price-lists.reverse` |
| Resources | 3 | `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies` |
| Jobs | 2 | `pricing.projections.refresh`, `pricing.reconciliation.run` |
| Workflows | 1 | `pricing-policy-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 6 | `Price List`, `Pricing Rule`, `Tax Rule`, `Commercial Policy`, `Payment Terms Template`, `Withholding Policy` |
| Reports | 4 | `Item Price Register`, `Pricing Rule Summary`, `Tax Rule Coverage`, `Payment Terms Adoption` |
| Exception Queues | 3 | `pricing-override-review`, `tax-rule-conflicts`, `currency-rounding-exceptions` |
| Operational Scenarios | 3 | `price-list-publication`, `quote-pricing-evaluation`, `tax-determination-and-withholding` |
| Settings Surfaces | 4 | `Accounts Settings`, `Selling Settings`, `Buying Settings`, `Currency Exchange Settings` |
| ERPNext Refs | 4 | `Accounts`, `Selling`, `Buying`, `Stock` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, publishPriceListAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/pricing-tax-core";

console.log(manifest.id);
console.log(publishPriceListAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/pricing-tax-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Add richer precedence, localization, and approval evidence where pricing and tax changes start driving live operations.
- Clarify override, promotion, and withholding flows before sector packs build on the pricing layer.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Price List`, `Item Price`, `Pricing Rule`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/FLOWS.md`
- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-pricing-tax-core/framework/builtin-plugins/pricing-tax-core/docs/MANDATORY_STEPS.md`
