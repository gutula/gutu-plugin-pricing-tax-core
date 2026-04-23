import { defineAction } from "@platform/schema";
import { z } from "zod";

import {
  createPrimaryRecord,
  advancePrimaryRecord,
  reconcilePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reversePrimaryRecord
} from "../services/main.service";
import {
  approvalStateSchema,
  fulfillmentStateSchema,
  postingStateSchema,
  recordStateSchema,
  createPrimaryRecordInputSchema,
  advancePrimaryRecordInputSchema,
  reconcilePrimaryRecordInputSchema,
  placePrimaryRecordOnHoldInputSchema,
  releasePrimaryRecordHoldInputSchema,
  amendPrimaryRecordInputSchema,
  reversePrimaryRecordInputSchema
} from "../model";

export const publishPriceListAction = defineAction({
  id: "pricing.price-lists.publish",
  description: "Publish Price List",
  input: createPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.price-lists.write",
  idempotent: true,
  audit: true,
  handler: ({ input }) => createPrimaryRecord(input)
});

export const publishTaxRulesAction = defineAction({
  id: "pricing.tax-rules.publish",
  description: "Publish Tax Rules",
  input: advancePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.tax-rules.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => advancePrimaryRecord(input)
});

export const evaluateCommercialPolicyAction = defineAction({
  id: "pricing.policies.evaluate",
  description: "Evaluate Commercial Policy",
  input: reconcilePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    exceptionId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.commercial-policies.read",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reconcilePrimaryRecord(input)
});

export const placeRecordOnHoldAction = defineAction({
  id: "pricing.price-lists.hold",
  description: "Place Record On Hold",
  input: placePrimaryRecordOnHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.price-lists.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => placePrimaryRecordOnHold(input)
});

export const releaseRecordHoldAction = defineAction({
  id: "pricing.price-lists.release",
  description: "Release Record Hold",
  input: releasePrimaryRecordHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.price-lists.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => releasePrimaryRecordHold(input)
});

export const amendRecordAction = defineAction({
  id: "pricing.price-lists.amend",
  description: "Amend Record",
  input: amendPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    amendedRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.price-lists.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => amendPrimaryRecord(input)
});

export const reverseRecordAction = defineAction({
  id: "pricing.price-lists.reverse",
  description: "Reverse Record",
  input: reversePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    reversalRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "pricing.price-lists.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reversePrimaryRecord(input)
});

export const businessActions = [
  publishPriceListAction,
  publishTaxRulesAction,
  evaluateCommercialPolicyAction,
  placeRecordOnHoldAction,
  releaseRecordHoldAction,
  amendRecordAction,
  reverseRecordAction
] as const;
