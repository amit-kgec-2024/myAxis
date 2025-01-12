import { FaUserAlt } from "react-icons/fa";

export const delivery = [
  { type: "label", label: "Delivery Partners" },
  { name: "Dashboard", icon: <FaUserAlt />, path: "/delivery-dashboard" },
  {
    name: "Profile",
    icon: <FaUserAlt />,
    path: "/delivery-view",
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
];
