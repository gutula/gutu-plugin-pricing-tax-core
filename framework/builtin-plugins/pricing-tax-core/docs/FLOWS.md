# Pricing & Tax Core Flows

## Happy paths

- `pricing.price-lists.publish`: Publish Price List
- `pricing.tax-rules.publish`: Publish Tax Rules
- `pricing.policies.evaluate`: Evaluate Commercial Policy
- `pricing.price-lists.hold`: Place Record On Hold
- `pricing.price-lists.release`: Release Record Hold
- `pricing.price-lists.amend`: Amend Record
- `pricing.price-lists.reverse`: Reverse Record

## Operational scenario matrix

- `price-list-publication`
- `quote-pricing-evaluation`
- `tax-determination-and-withholding`

## Action-level flows

### `pricing.price-lists.publish`

Publish Price List

Permission: `pricing.price-lists.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.tax-rules.publish`

Publish Tax Rules

Permission: `pricing.tax-rules.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.policies.evaluate`

Evaluate Commercial Policy

Permission: `pricing.commercial-policies.read`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.price-lists.hold`

Place Record On Hold

Permission: `pricing.price-lists.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.price-lists.release`

Release Record Hold

Permission: `pricing.price-lists.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.price-lists.amend`

Amend Record

Permission: `pricing.price-lists.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `pricing.price-lists.reverse`

Reverse Record

Permission: `pricing.price-lists.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `pricing.price-lists`, `pricing.tax-rules`, `pricing.commercial-policies`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `product-catalog-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.pricing`, `events.publish.pricing`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Price List`, `Item Price`, `Pricing Rule`, `Tax Rule`, `Item Tax Template`, `Payment Term`, `Payment Terms Template`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
