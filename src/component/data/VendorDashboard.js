import { FaUserAlt } from "react-icons/fa";

export const vendor = [
  { type: "label", label: "Vendor" },
  { name: "Dashboard", icon: <FaUserAlt />, path: "/vendor-dashboard" },
  {
    name: "Profile",
    icon: <FaUserAlt />,
    path: "/vendor-view",
  },
  {
    name: "Products",
    icon: <FaUserAlt />,
    path: "#",
    children: [
      { name: "Mobiles", path: "/vendor/mobile" },
      { name: "Appliances", path: "/vendor/appliances" },
      { name: "Electronics", path: "/vendor/electronics" },
      { name: "Fashions", path: "/vendor/fashion" },
      { name: "Beauty", path: "/vendor/beauty" },
      { name: "KItchen", path: "/vendor/kitchen" },
      { name: "Furniture", path: "/vendor/furniture" },
      { name: "Grocery", path: "/vendor/grocery" },
    ],
  },
  {
    name: "Customers",
    icon: <FaUserAlt />,
    path: "#",
    children: [
      {
        name: "Partner Category",
        path: "#",
      },
      { name: "Partner", path: "#" },
    ],
  },
  {
    name: "Products",
    icon: <FaUserAlt />,
    children: [
      {
        name: "Partner Category",
        path: "#",
      },
      { name: "Partner", path: "#" },
    ],
  },
];
