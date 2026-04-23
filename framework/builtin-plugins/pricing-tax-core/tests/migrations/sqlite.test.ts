import { describe, expect, it } from "bun:test";

import {
  buildPricingTaxCoreSqliteMigrationSql,
  buildPricingTaxCoreSqliteRollbackSql,
  getPricingTaxCoreSqliteLookupIndexName,
  getPricingTaxCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("pricing-tax-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPricingTaxCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pricing_tax_core_exception_records");
    expect(sql).toContain(getPricingTaxCoreSqliteLookupIndexName("pricing_tax_core_"));
    expect(sql).toContain(getPricingTaxCoreSqliteStatusIndexName("pricing_tax_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildPricingTaxCoreSqliteRollbackSql({ tablePrefix: "pricing_tax_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS pricing_tax_core_preview_exception_records");
  });
});
