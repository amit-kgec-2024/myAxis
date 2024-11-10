import { FaUserAlt } from "react-icons/fa";

export const admin = [
  { type: "label", label: "Admin" },
  { name: "Dashboard", icon: <FaUserAlt />, path: "/dashboard" },
  {
    name: "User Type",
    icon: <FaUserAlt />,
    path: "#",
    children: [
      { name: "Vendors", path: "/vendor-list" },
      { name: "Sellers", path: "/seller-list" },
      { name: "Delivery Partners", path: "/delivery-list" },
      { name: "Help Desk", path: "/help-list" },
      { name: "Customers", path: "/customers-list" },
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
      { name: "Partners", path: "#" },
    ],
  },
  {
    name: "Products",
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
    name: "Banner",
    icon: <FaUserAlt />,
    path: "#",
    children: [
      {
        name: "Home",
        path: "/banner/home",
      },
      { name: "Appliance", path: "/banner/appliance" },
      { name: "Beauty", path: "/banner/beauty" },
      { name: "Electronics", path: "/banner/electronics" },
      { name: "Fashion", path: "/banner/fashion" },
      { name: "Furniture", path: "/banner/furniture" },
      { name: "Grocery", path: "/banner/grocery" },
      { name: "Kitchen", path: "/banner/kitchen" },
      { name: "Mobile", path: "/banner/mobile" },
    ],
  },
  {
    name: "Orders",
    icon: <FaUserAlt />,
    path: "#",
  },
  {
    name: "Refunds",
    icon: <FaUserAlt />,
    path: "#",
  },
];
