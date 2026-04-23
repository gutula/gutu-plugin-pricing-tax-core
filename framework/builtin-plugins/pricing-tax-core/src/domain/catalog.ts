export const domainCatalog = {
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
} as const;
