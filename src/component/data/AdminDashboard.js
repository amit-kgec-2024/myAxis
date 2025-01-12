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
      { name: "Help Desk", path: "/helpdesk-list" },
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
      { name: "Parent Category", path: "/parentcategory-list" },
      { name: "Category", path: "/category-list" },
      { name: "Varients", path: "/varient-list" },
      { name: "Brands", path: "/brand-list" },
      { name: "Product List", path: "/product-list" },
    ],
  },
  {
    name: "Banner",
    icon: <FaUserAlt />,
    path: "/banner",
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
