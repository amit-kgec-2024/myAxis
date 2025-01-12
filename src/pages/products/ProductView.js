import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { environment } from "../../enviroment/enviroment";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import Textarea from "../../component/tag/Textarea";
import NumberInput from "../../component/tag/NumberInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const gstList = [
  { id: 1, gst: "0" },
  { id: 2, gst: "5" },
  { id: 3, gst: "12" },
  { id: 4, gst: "18" },
  { id: 5, gst: "28" },
];

const ProductView = () => {
  const navigate = useNavigate();
  const [parentcategoryList, setParentcategoryList] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [isCode, setIsCode] = useState("");
  const [isDescription, setIsDescription] = useState("");
  const [multipleimage, setMultipleImage] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [isIncludeGst, setIsIncludeGst] = useState(false);
  const [isUnitPrice, setIsUnitPrice] = useState("0.00");
  const [isCommision, setIsCommision] = useState("0.00");
  const [isDeliveryCharge, setIsDeliveryCharge] = useState("0.00");
  const [isQuantity, setIsQuantity] = useState("1");
  const [isAcualPrice, setIsAcualPrice] = useState("0.00");
  const [isTaxChecked, setIsTaxChecked] = useState(false);
  const [isGstPercent, setIsGstPercent] = useState("0");

  const unitPrice = parseFloat(isUnitPrice);
  const commision = parseFloat(isCommision);
  const deliveryCharge = parseFloat(isDeliveryCharge);
  const gstPrice = parseInt(isGstPercent);

  const ntfPrice = unitPrice + unitPrice * (commision / 100) + deliveryCharge;

  const totalprice = ntfPrice + ntfPrice * (gstPrice / 100);

  const finalPrice = Math.floor(totalprice);

  const parentCategory = async () => {
    try {
      const response = await fetch(
        environment.apiUrl + `parentcategory/active/list`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      const filteredList = dataList.list.map(({ id, parentCategoryName }) => ({
        id,
        parentCategoryName,
      }));
      setParentcategoryList(filteredList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async (parentCategoryId) => {
    try {
      const response = await fetch(
        environment.apiUrl + `category/list2/${parentCategoryId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      const filteredList = dataList.list.map(({ id, categoryName }) => ({
        id,
        categoryName,
      }));
      setCategoryList(filteredList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const brandData = async (selectedParentCategory) => {
    try {
      const response = await fetch(
        environment.apiUrl + `brand/list2/${selectedParentCategory}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      const filteredList = dataList.list.map(({ id, brandName }) => ({
        id,
        brandName,
      }));
      setBrandList(filteredList);
    } catch (error) {
      console.log(error);
    }
  };

  const productId = sessionStorage.getItem("productId");
  const getProductData = useCallback(async (productId) => {
    try {
      const response = await fetch(
        environment.apiUrl + `product/view/${productId}`
      );
      const getData = await response.json();
      setMultipleImage(getData?.imageList);
      setIsActive(getData?.data?.isActive);
      setProductName(getData?.data?.productName);
      setIsCode(getData?.data?.code);
      setIsDescription(getData?.data?.description);
      setImage(getData?.data?.primaryImage);
      setSelectedParentCategory(getData?.data?.parentCategoryId);
      fetchCategories(getData?.data?.parentCategoryId);
      brandData(getData?.data?.parentCategoryId);
      setSelectedCategory(getData?.data?.categoryId);
      setSelectedBrand(getData?.data?.brandId);
      setIsUnitPrice(getData?.data?.unitPrice);
      setIsIncludeGst(getData?.data?.includeGst);
      setIsCommision(getData?.data?.commission);
      setIsDeliveryCharge(getData?.data?.deliveryCharge);
      setIsQuantity(getData?.data?.quantity);
      setIsAcualPrice(getData?.data?.actualPrice);
      setIsTaxChecked(getData?.data?.isGst);
      setIsGstPercent(getData?.data?.gstPrice);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      getProductData(productId);
    }
  }, [productId, getProductData]);
  useEffect(() => {
    parentCategory();
  }, []);

  const handelDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to Permanent delete this Products?"
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Product Permanent Delete Successfully");
        navigate("/product-list");
      } else {
        console.error("Failed to delete bank from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelStatus = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to ${
        isActive === true ? "DeActive" : "Active"
      } this Product?`
    );
    if (!isConfirmed) return;
    try {
      const response = await fetch(
        environment.apiUrl + `product/status/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        getProductData(productId);
        toast.success(
          `Product ${isActive === true ? "DeActive" : "Active"} Successfully`
        );
      } else {
        console.error("Failed to delete bank from the server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container className="flex flex-col md:flex-row justify-center items-start">
        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[50%] p-4">
          <div className="shadow-lg bg-slate-200 w-[30rem] h-[30rem] p-1">
            <img
              src={image}
              alt="Bird"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {multipleimage.map((ele, index) => (
              <img
                key={index}
                src={ele.src}
                alt="Bird"
                className="w-40 h-40 cursor-pointer border hover:border-2 object-contain"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 w-full md:w-[50%] p-2">
          <div className="flex flex-row items-center gap-4 justify-end px-2 md:px-5 py-3">
            <button
              onClick={(e) => handelStatus(e)}
              className={`px-6 py-2 text-white ${
                isActive === true ? "bg-red-600" : "bg-green-600"
              } outline-none rounded-md font-semibold`}
            >
              {isActive === true ? "DeActive" : "Active"}
            </button>
            <button
              onClick={(e) => handelDelete(e)}
              className="px-6 py-2 text-white bg-red-600 outline-none rounded-md font-semibold"
            >
              Delete
            </button>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-around py-4">
            <div className="outline-none border-2 border-teal-300 rounded-lg p-2">
              {parentcategoryList.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className={`${
                    category.id === selectedParentCategory ? "" : "hidden"
                  }`}
                >
                  {category.parentCategoryName}
                </option>
              ))}
            </div>
            <div className="outline-none border-2 border-teal-300  rounded-lg p-2">
              {categoryList.map((category) => (
                <div
                  key={category.id}
                  value={category.id}
                  className={`${
                    category.id === selectedCategory ? "" : "hidden"
                  }`}
                >
                  {category.categoryName}
                </div>
              ))}
            </div>
            <div className="outline-none border-2 border-teal-300  rounded-lg p-2">
              {brandList.map((brand) => (
                <div
                  key={brand.id}
                  value={brand.id}
                  className={`${brand.id === selectedBrand ? "" : "hidden"}`}
                >
                  {brand.brandName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Input
              label="Product Name"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={setProductName}
              className2="w-full"
              readOnly={true}
            />
            <Input
              label="Code"
              type="text"
              placeholder="Code"
              value={isCode}
              onChange={setIsCode}
              className2="w-full"
              readOnly={true}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <NumberInput
              label="Unit Price*"
              type="text"
              placeholder="Unit Price"
              value={isUnitPrice}
              onChange={setIsUnitPrice}
              readOnly={true}
            />
            <div className="flex flex-row items-center gap-4">
              <input
                type="checkbox"
                style={{ width: "20px", height: "20px" }}
                checked={isIncludeGst}
              />
              <span>Include GST</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <NumberInput
              label="Commission (%)"
              type="text"
              placeholder="Commission"
              value={isCommision}
              onChange={setIsCommision}
              readOnly={true}
            />
            <NumberInput
              label="Delivery Charge"
              type="text"
              placeholder="Delivery Charge"
              value={isDeliveryCharge}
              onChange={setIsDeliveryCharge}
              readOnly={true}
            />
          </div>
          <div
            className={`${
              isIncludeGst === true ? "hidden" : "flex"
            } flex-col md:flex-row items-center justify-start gap-4`}
          >
            <div className="flex flex-row items-center gap-4">
              <input
                type="checkbox"
                style={{ width: "20px", height: "20px" }}
                checked={isTaxChecked}
              />
              <span>Charge tax on this product</span>
            </div>
            <div
              className={`outline-none border-2 border-teal-300 rounded-lg p-2 ${
                isTaxChecked === true ? "" : "hidden"
              }`}
            >
              {gstList.map((category) => (
                <div
                  key={category.id}
                  value={category.gst}
                  className={`${category.gst === isGstPercent ? "" : "hidden"}`}
                >
                  {category.gst}%
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start gap-4 pt-4">
            <NumberInput
              label="Quantity"
              type="text"
              placeholder="Quantity"
              value={isQuantity}
              onChange={setIsQuantity}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
            <p className="font-bold text-base md:text-xl">
              Final Price will show on site :{" "}
              <span className="text-slate-400">₹ {finalPrice}.00</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <NumberInput
              label="Actual Price"
              type="text"
              placeholder="Actual Price"
              value={isAcualPrice}
              onChange={setIsAcualPrice}
              readOnly={true}
            />
          </div>
        </div>
      </Container>
      <Container>
        <Textarea
          label="Description"
          type="text"
          placeholder="Description"
          value={isDescription}
          onChange={setIsDescription}
          className2="w-full"
          readOnly={true}
        />
      </Container>
    </Layout>
  );
};

export default ProductView;
