export const reportDefinitions = [
  {
    "id": "pricing-tax-core.report.01",
    "label": "Item Price Register",
    "owningPlugin": "pricing-tax-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "pricing-override-review",
      "tax-rule-conflicts",
      "currency-rounding-exceptions"
    ]
  },
  {
    "id": "pricing-tax-core.report.02",
    "label": "Pricing Rule Summary",
    "owningPlugin": "pricing-tax-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "pricing-override-review",
      "tax-rule-conflicts",
      "currency-rounding-exceptions"
    ]
  },
  {
    "id": "pricing-tax-core.report.03",
    "label": "Tax Rule Coverage",
    "owningPlugin": "pricing-tax-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "pricing-override-review",
      "tax-rule-conflicts",
      "currency-rounding-exceptions"
    ]
  },
  {
    "id": "pricing-tax-core.report.04",
    "label": "Payment Terms Adoption",
    "owningPlugin": "pricing-tax-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "pricing-override-review",
      "tax-rule-conflicts",
      "currency-rounding-exceptions"
    ]
  }
] as const;
