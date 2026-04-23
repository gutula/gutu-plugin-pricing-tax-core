export const exceptionQueueDefinitions = [
  {
    "id": "pricing-override-review",
    "label": "Pricing Override Review",
    "severity": "medium",
    "owner": "pricing-analyst",
    "reconciliationJobId": "pricing.reconciliation.run"
  },
  {
    "id": "tax-rule-conflicts",
    "label": "Tax Rule Conflicts",
    "severity": "medium",
    "owner": "pricing-analyst",
    "reconciliationJobId": "pricing.reconciliation.run"
  },
  {
    "id": "currency-rounding-exceptions",
    "label": "Currency Rounding Exceptions",
    "severity": "medium",
    "owner": "pricing-analyst",
    "reconciliationJobId": "pricing.reconciliation.run"
  }
] as const;
