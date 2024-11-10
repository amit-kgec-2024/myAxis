export const helpdesk = [
  { type: "label", label: "Help Desk" },
  { name: "Dashboard", path: "/helpdesk-dashboard" },
  {
    name: "Enquiry",
    path: "/enquiry",
  },
  {
    name: "Financial Consultant",
    // icon: duotone.UserProfile,
    path: "/financialConsultant",
  },
  {
    name: "Lending Partners",
    // icon: duotone.UserProfile,
    children: [
      {
        name: "Partner Category",
        path: "/partners/partnerCategory/categoryList",
      },
      { name: "Partner", path: "/partners/partner/partnerList" },
    ],
  },
];
