export const delivery = [
  { type: "label", label: "Delivery Partners" },
  { name: "Dashboard", path: "/delivery-dashboard" },
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
