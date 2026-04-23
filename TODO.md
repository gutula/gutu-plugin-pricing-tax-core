# Pricing & Tax Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

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

## Current Gaps

- No additional gaps were identified beyond the plugin’s stated non-goals.

## Recommended Next

- Add richer precedence, localization, and approval evidence where pricing and tax changes start driving live operations.
- Clarify override, promotion, and withholding flows before sector packs build on the pricing layer.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Price List`, `Item Price`, `Pricing Rule`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
