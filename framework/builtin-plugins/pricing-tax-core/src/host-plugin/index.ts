/** Host-plugin contribution for pricing-tax-core.
 *
 *  Mounts at /api/<routes> via the shell's plugin loader. */
import type { HostPlugin } from "@gutu-host/plugin-contract";

import { pricingRuleRoutes } from "./routes/pricing-rules";


export const hostPlugin: HostPlugin = {
  id: "pricing-tax-core",
  version: "1.0.0",
  
  routes: [
    { mountPath: "/pricing-rules", router: pricingRuleRoutes }
  ],
  resources: [
    "pricing-tax.price",
    "pricing-tax.tax-rule",
  ],
};

// Re-export the lib API so other plugins can `import` from
// "@gutu-plugin/pricing-tax-core".
export * from "./lib";
