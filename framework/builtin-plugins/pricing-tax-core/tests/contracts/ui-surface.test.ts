import { describe, expect, it } from "bun:test";

import { uiSurface } from "../../src/ui/surfaces";

describe("pricing-tax-core ui surface", () => {
  it("mounts the business control room", () => {
    expect(uiSurface.embeddedPages[0]?.route).toBe("/admin/business/pricing");
  });
});
