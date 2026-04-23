import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "pricing.price-lists.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "pricing.price-lists.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "pricing.price-lists.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "pricing.price-lists.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
