import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "pricing.price-lists.publish",
    "label": "Publish Price List",
    "phase": "create",
    "methodName": "publishPriceList"
  },
  {
    "id": "pricing.tax-rules.publish",
    "label": "Publish Tax Rules",
    "phase": "advance",
    "methodName": "publishTaxRules"
  },
  {
    "id": "pricing.policies.evaluate",
    "label": "Evaluate Commercial Policy",
    "phase": "reconcile",
    "methodName": "evaluateCommercialPolicy"
  }
] as const;

export async function publishPriceList(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function publishTaxRules(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function evaluateCommercialPolicy(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
