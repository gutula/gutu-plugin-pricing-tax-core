import { describe, expect, it } from "bun:test";

import {
  buildPricingTaxCoreMigrationSql,
  buildPricingTaxCoreRollbackSql,
  getPricingTaxCoreLookupIndexName,
  getPricingTaxCoreStatusIndexName
} from "../../src/postgres";

describe("pricing-tax-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPricingTaxCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core.exception_records");
    expect(sql).toContain(getPricingTaxCoreLookupIndexName());
    expect(sql).toContain(getPricingTaxCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildPricingTaxCoreRollbackSql({ schemaName: "pricing_tax_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS pricing_tax_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS pricing_tax_core_preview CASCADE");
  });
});
