import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "pricing-tax-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-pricing-tax-core",
  "displayName": "Pricing & Tax Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "pricing_tax",
    "subcategoryLabel": "Pricing & Tax"
  },
  "description": "Shared price lists, discount rules, tax determination, withholding rules, and commercial policy precedence for every order and billing flow.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "party-relationships-core",
    "product-catalog-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "product-catalog-core",
      "class": "required",
      "rationale": "Required for Pricing & Tax Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "optional",
      "rationale": "Recommended with Pricing & Tax Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "procurement-core",
      "class": "optional",
      "rationale": "Recommended with Pricing & Tax Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "accounting-core",
      "class": "optional",
      "rationale": "Recommended with Pricing & Tax Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "pos-core",
      "class": "capability-enhancing",
      "rationale": "Improves Pricing & Tax Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "subscriptions-core",
      "class": "capability-enhancing",
      "rationale": "Improves Pricing & Tax Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "e-invoicing-core",
      "class": "capability-enhancing",
      "rationale": "Improves Pricing & Tax Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "business-portals-core",
      "class": "integration-only",
      "rationale": "Only needed when Pricing & Tax Core must exchange data or actions with adjacent or external surfaces."
    }
  ],
  "recommendedPlugins": [
    "sales-core",
    "procurement-core",
    "accounting-core"
  ],
  "capabilityEnhancingPlugins": [
    "pos-core",
    "subscriptions-core",
    "e-invoicing-core"
  ],
  "integrationOnlyPlugins": [
    "business-portals-core"
  ],
  "suggestedPacks": [
    "localization-global-base",
    "localization-india",
    "localization-united-states"
  ],
  "standaloneSupported": true,
  "installNotes": [
    "Install with Accounting for production-grade statutory and settlement behavior."
  ],
  "optionalWith": [
    "sales-core",
    "procurement-core",
    "accounting-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "pricing.price-lists",
    "pricing.tax-rules",
    "pricing.commercial-policies"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.pricing",
    "events.publish.pricing"
  ],
  "ownsData": [
    "pricing.price-lists",
    "pricing.tax-rules",
    "pricing.commercial-policies",
    "pricing.payment-terms"
  ],
  "extendsData": [],
  "publicCommands": [
    "pricing.price-lists.publish",
    "pricing.tax-rules.publish",
    "pricing.policies.evaluate",
    "pricing.price-lists.hold",
    "pricing.price-lists.release",
    "pricing.price-lists.amend",
    "pricing.price-lists.reverse"
  ],
  "publicQueries": [
    "pricing.quote-context",
    "pricing.tax-context"
  ],
  "publicEvents": [
    "pricing.price-list-published.v1",
    "pricing.tax-rules-published.v1",
    "pricing.policy-overridden.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Accounts",
      "Selling",
      "Buying",
      "Stock"
    ],
    "erpnextDoctypes": [
      "Price List",
      "Item Price",
      "Pricing Rule",
      "Tax Rule",
      "Item Tax Template",
      "Payment Term",
      "Payment Terms Template"
    ],
    "ownedEntities": [
      "Price List",
      "Pricing Rule",
      "Tax Rule",
      "Commercial Policy",
      "Payment Terms Template",
      "Withholding Policy"
    ],
    "reports": [
      "Item Price Register",
      "Pricing Rule Summary",
      "Tax Rule Coverage",
      "Payment Terms Adoption"
    ],
    "exceptionQueues": [
      "pricing-override-review",
      "tax-rule-conflicts",
      "currency-rounding-exceptions"
    ],
    "operationalScenarios": [
      "price-list-publication",
      "quote-pricing-evaluation",
      "tax-determination-and-withholding"
    ],
    "settingsSurfaces": [
      "Accounts Settings",
      "Selling Settings",
      "Buying Settings",
      "Currency Exchange Settings"
    ],
    "edgeCases": [
      "overlapping promotions",
      "inclusive versus exclusive tax conflicts",
      "multi-currency rounding drift"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
