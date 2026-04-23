import { defineUiSurface } from "@platform/ui-shell";

import { BusinessAdminPage } from "./admin/main.page";

export const uiSurface = defineUiSurface({
  embeddedPages: [
    {
      shell: "admin",
      route: "/admin/business/pricing",
      component: BusinessAdminPage,
      permission: "pricing.price-lists.read"
    }
  ],
  widgets: []
});
