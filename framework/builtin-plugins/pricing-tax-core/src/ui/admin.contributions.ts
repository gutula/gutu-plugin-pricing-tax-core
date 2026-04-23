import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "business-foundations",
      label: "Business Foundations",
      icon: "briefcase-business",
      description: "Canonical shared masters and governed reference data.",
      permission: "pricing.price-lists.read",
      homePath: "/admin/business/pricing",
      quickActions: ["pricing-tax-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "business-foundations",
      group: "control-room",
      items: [
        {
          id: "pricing-tax-core.overview",
          label: "Control Room",
          icon: "briefcase-business",
          to: "/admin/business/pricing",
          permission: "pricing.price-lists.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "pricing-tax-core.page",
      kind: "dashboard",
      route: "/admin/business/pricing",
      label: "Pricing & Tax Control Room",
      workspace: "business-foundations",
      group: "control-room",
      permission: "pricing.price-lists.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "pricing-tax-core.open.control-room",
      label: "Open Pricing & Tax Core",
      permission: "pricing.price-lists.read",
      href: "/admin/business/pricing",
      keywords: ["pricing & tax core","business foundations","business"]
    })
  ]
};
