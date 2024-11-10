import { FaUserAlt } from "react-icons/fa";

export const seller = [
  { type: "label", label: "Seller" },
  { name: "Dashboard", icon: <FaUserAlt />, path: "/seller-dashboard" },
  {
    name: "Profile",
    icon: <FaUserAlt />,
    path: "/seller-view",
  },
  {
    name: "Products",
    icon: <FaUserAlt />,
    path: "#",
    children: [
      { name: "Mobiles", path: "/seller/mobile" },
      { name: "Appliances", path: "/seller/appliances" },
      { name: "Electronics", path: "/seller/electronics" },
      { name: "Fashions", path: "/seller/fashion" },
      { name: "Beauty", path: "/seller/beauty" },
      { name: "KItchen", path: "/seller/kitchen" },
      { name: "Furniture", path: "/seller/furniture" },
      { name: "Grocery", path: "/seller/grocery" },
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
