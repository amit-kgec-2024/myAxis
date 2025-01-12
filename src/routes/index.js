import { Route, Routes as Router } from "react-router-dom";
import Home from "../pages/home/Home";
import Members from "../pages/members/Members";
import Applications from "../pages/applications/Applications";
import Administrator from "../pages/administrator/Administrator";
import Page404 from "../pages/Page404";
// Banner
import BannerHome from "../pages/banner/Home";
import BannerAppliance from "../pages/banner/Appliance";
import BannerBeauty from "../pages/banner/Beauty";
import BannerElectronics from "../pages/banner/Electronics";
import BannerFashion from "../pages/banner/Fashion";
import BannerFurniture from "../pages/banner/Furniture";
import BannerGrocery from "../pages/banner/Grocery";
import BannerKitchen from "../pages/banner/Kitchen";
import BannerMobile from "../pages/banner/Mobile";
// Sellers
import SellersList from "../pages/seller/SellersList";

// Admins
import AdminDashboard from "../pages/admin/Dashboard";
import SellerAdd from "../pages/seller/SellerAdd";
import SellerView from "../pages/seller/SellerView";
import SellerEdit from "../pages/seller/SellerEdit";
import VendorList from "../pages/vendor/VendorList";
import VendorAdd from "../pages/vendor/VendorAdd";
import VendorView from "../pages/vendor/VendorView";
import VendorEdit from "../pages/vendor/VendorEdit";
import SellerDashboard from "../pages/seller/SellerDashboard";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";
import DeliveryList from "../pages/delivery/DeliveryList";
import DeliveryAdd from "../pages/delivery/DeliveryAdd";
import DeliveryView from "../pages/delivery/DeliveryView";
import DeliveryEdit from "../pages/delivery/DeliveryEdit";
import HelpdeskDashboard from "../pages/helpdesk/HelpdeskDashboard";
import HelpdeskList from "../pages/helpdesk/HelpdeskList";
import HelpdeskAdd from "../pages/helpdesk/HelpdeskAdd";
import HelpdeskView from "../pages/helpdesk/HelpdeskView";
import HelpdeskEdit from "../pages/helpdesk/HelpdeskEdit";
import BannerList from "../pages/banner/BannerList";
// Parent Category
import ParentcategoryList from "../pages/parentcatecory/ParentcategoryList";
import ParentcategoryAdd from "../pages/parentcatecory/ParentcategoryAdd";
import ParentcategoryEdit from "../pages/parentcatecory/ParentcategoryEdit";
// Category
import CategoryList from "../pages/category/CategoryList";
import CategoryEdit from "../pages/category/CategoryEdit";
import CategoryAdd from "../pages/category/CategoryAdd";
// Brands
import BrandAdd from "../pages/brands/BrandAdd";
import BrandEdit from "../pages/brands/BrandEdit";
import BrandList from "../pages/brands/BrandList";
// Products
import ProductList from "../pages/products/ProductList";
import ProductAdd from "../pages/products/ProductAdd";
import ProductEdit from "../pages/products/ProductEdit";
import ProductView from "../pages/products/ProductView";
// Varients
import VarientList from "../pages/varients/VarientList";
import VarientAdd from "../pages/varients/VarientAdd";
import VarientEdit from "../pages/varients/VarientEdit";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<Members />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/administrator" element={<Administrator />} />
      <Route path="*" element={<Page404 />} />
      {/* Admin */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      {/* Sellers */}
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/seller-list" element={<SellersList />} />
      <Route path="/seller-add" element={<SellerAdd />} />
      <Route path="/seller-view" element={<SellerView />} />
      <Route path="/seller-edit" element={<SellerEdit />} />
      {/* Vendors */}
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/vendor-list" element={<VendorList />} />
      <Route path="/vendor-add" element={<VendorAdd />} />
      <Route path="/vendor-view" element={<VendorView />} />
      <Route path="/vendor-edit" element={<VendorEdit />} />
      {/* Delivery */}
      <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      <Route path="/delivery-list" element={<DeliveryList />} />
      <Route path="/delivery-add" element={<DeliveryAdd />} />
      <Route path="/delivery-view" element={<DeliveryView />} />
      <Route path="/delivery-edit" element={<DeliveryEdit />} />
      {/* Helpdesk */}
      <Route path="/helpdesk-dashboard" element={<HelpdeskDashboard />} />
      <Route path="/helpdesk-list" element={<HelpdeskList />} />
      <Route path="/helpdesk-add" element={<HelpdeskAdd />} />
      <Route path="/helpdesk-view" element={<HelpdeskView />} />
      <Route path="/helpdesk-edit" element={<HelpdeskEdit />} />
      {/* Banner */}
      <Route path="/banner" element={<BannerList />} />
      <Route path="/banner/home" element={<BannerHome />} />
      <Route path="/banner/appliance" element={<BannerAppliance />} />
      <Route path="/banner/beauty" element={<BannerBeauty />} />
      <Route path="/banner/electronics" element={<BannerElectronics />} />
      <Route path="/banner/fashion" element={<BannerFashion />} />
      <Route path="/banner/furniture" element={<BannerFurniture />} />
      <Route path="/banner/grocery" element={<BannerGrocery />} />
      <Route path="/banner/kitchen" element={<BannerKitchen />} />
      <Route path="/banner/mobile" element={<BannerMobile />} />
      {/* Parant category */}
      <Route path="/parentcategory-add" element={<ParentcategoryAdd />} />
      <Route path="/parentcategory-edit" element={<ParentcategoryEdit />} />
      <Route path="/parentcategory-list" element={<ParentcategoryList />} />
      {/* Category */}
      <Route path="/category-add" element={<CategoryAdd />} />
      <Route path="/category-edit" element={<CategoryEdit />} />
      <Route path="/category-list" element={<CategoryList />} />
      {/* Brands */}
      <Route path="/brand-list" element={<BrandList />} />
      <Route path="/brand-add" element={<BrandAdd />} />
      <Route path="/brand-edit" element={<BrandEdit />} />
      {/* Products */}
      <Route path="/product-add" element={<ProductAdd />} />
      <Route path="/product-edit" element={<ProductEdit />} />
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/product-view" element={<ProductView />} />
      {/* Varients */}
      <Route path="/varient-add" element={<VarientAdd />} />
      <Route path="/varient-edit" element={<VarientEdit />} />
      <Route path="/varient-list" element={<VarientList />} />
    </Router>
  );
};

export default Routes;
