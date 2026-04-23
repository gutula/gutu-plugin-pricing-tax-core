export const scenarioDefinitions = [
  {
    "id": "price-list-publication",
    "owningPlugin": "pricing-tax-core",
    "workflowId": "pricing-policy-lifecycle",
    "actionIds": [
      "pricing.price-lists.publish",
      "pricing.tax-rules.publish",
      "pricing.policies.evaluate"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "quote-pricing-evaluation",
    "owningPlugin": "pricing-tax-core",
    "workflowId": "pricing-policy-lifecycle",
    "actionIds": [
      "pricing.price-lists.publish",
      "pricing.tax-rules.publish",
      "pricing.policies.evaluate"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "tax-determination-and-withholding",
    "owningPlugin": "pricing-tax-core",
    "workflowId": "pricing-policy-lifecycle",
    "actionIds": [
      "pricing.price-lists.publish",
      "pricing.tax-rules.publish",
      "pricing.policies.evaluate"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
