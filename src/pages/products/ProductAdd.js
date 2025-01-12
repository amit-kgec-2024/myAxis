import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { environment } from "../../enviroment/enviroment";
import ProductImages from "../../component/tag/ProductImages";
import Productimagemultiple from "../../component/tag/Productimagemultiple";
import Container from "../../component/tag/Container";
import H1 from "../../component/tag/H1";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import Input from "../../component/tag/Input";
import Textarea from "../../component/tag/Textarea";
import NumberInput from "../../component/tag/NumberInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const gstList = [
  { id: 1, gst: "0" },
  { id: 2, gst: "5" },
  { id: 3, gst: "12" },
  { id: 4, gst: "18" },
  { id: 5, gst: "28" },
];

const ProductAdd = () => {
  const router = useNavigate();
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
  const [isToggle, setIsToggle] = useState(1);
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
  const quantity = parseInt(isQuantity, 10);
  const gstPrice = parseInt(isGstPercent);
  const actualprice = parseInt(isAcualPrice);

  const ntfPrice = unitPrice + unitPrice * (commision / 100) + deliveryCharge;

  const totalprice = ntfPrice + ntfPrice * (gstPrice / 100);

  const finalPrice = Math.floor(totalprice);

  const handleToggle = (toggleis) => {
    setIsToggle(toggleis);
  };

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };

  const handleMultipleImageChange = (newImage) => {
    setMultipleImage(newImage);
  };

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

  const handleGst = (e) => {
    const isGstPercent = e.target.value;
    if (isGstPercent) {
      setIsGstPercent(isGstPercent);
    } else {
      setIsGstPercent("");
    }
  };
  const handleIncludeGst = (e) => {
    setIsIncludeGst(e.target.checked);
    setIsTaxChecked(false);
    setIsGstPercent("0");
  };
  const handleCheckboxChange = (e) => {
    setIsTaxChecked(e.target.checked);
    if (!e.target.checked) {
      setIsGstPercent("0");
    }
  };
  const handleParentCategoryChange = (e) => {
    const parentCategoryId = e.target.value;
    setSelectedParentCategory(parentCategoryId);
    if (parentCategoryId) {
      fetchCategories(parentCategoryId);
      brandData(parentCategoryId);
    } else {
      setCategoryList([]);
      setBrandList([]);
    }
  };
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  };
  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrand(brandId);
  };

  useEffect(() => {
    parentCategory();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = {
      categoryId: selectedCategory,
      brandId: selectedBrand,
      parentCategoryId: selectedParentCategory,
      primaryImage: image,
      productName: productName,
      code: isCode,
      description: isDescription,
      unitPrice: unitPrice.toFixed(2),
      commission: commision.toFixed(2),
      deliveryCharge: deliveryCharge.toFixed(2),
      quantity: quantity,
      gstPrice: gstPrice,
      actualPrice: actualprice.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      isGst: isTaxChecked,
      includeGst: isIncludeGst,
      multipleimage: multipleimage,
    };
    console.log("------------------------>", data);
    try {
      const response = await fetch(environment.apiUrl + "product/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("product Add SuccesFully");
      router("/product-list");
    } catch (error) {
      console.log(error);
      toast.error("Network Issue!");
    }
  };
  return (
    <Layout>
      <Container>
        <H1>Add Products</H1>
      </Container>
      <Container className="flex flex-row flex-wrap items-center py-3 px-2">
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 1
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Product View in Web
        </div>
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 2
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Product List info
        </div>
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 3
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Parameters
        </div>
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 4
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Specifications
        </div>
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 5
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Pricing
        </div>
        <div
          className={`font-bold text-lg border-b-4 ${
            isToggle === 6
              ? "border-teal-500 text-teal-500"
              : "border-white text-black"
          } py-2 px-3 uppercase`}
        >
          Search Engine Listing
        </div>
      </Container>
      <Container className={`${isToggle === 1 ? "flex flex-col" : "hidden"}`}>
        <div className="flex flex-wrap items-center justify-around py-4">
          <select
            id="parentCategory"
            name="parentCategory"
            className="outline-none border-2 border-teal-300 rounded-lg p-2"
            value={selectedParentCategory}
            onChange={handleParentCategoryChange}
          >
            <option value="">Select Parent Category</option>
            {parentcategoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.parentCategoryName}
              </option>
            ))}
          </select>
          <select
            id="parentCategory"
            name="parentCategory"
            className="outline-none border-2 border-teal-300  rounded-lg p-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <select
            id="parentCategory"
            name="parentCategory"
            className="outline-none border-2 border-teal-300  rounded-lg p-2"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Select Brand</option>
            {brandList.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
        <ProductImages value={image} onChange={handleImageChange} />
        <Productimagemultiple
          value={multipleimage}
          onChange={handleMultipleImageChange}
        />
      </Container>
      <Container className={`${isToggle === 2 ? "flex flex-col" : "hidden"}`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Input
            label="Product Name"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={setProductName}
            className2="w-full"
          />
          <Input
            label="Code"
            type="text"
            placeholder="Code"
            value={isCode}
            onChange={setIsCode}
            className2="w-full"
          />
        </div>
        <Textarea
          label="Description"
          type="text"
          placeholder="Description"
          value={isDescription}
          onChange={setIsDescription}
          className2="w-full"
        />
      </Container>
      <Container className={`${isToggle === 5 ? "flex flex-col" : "hidden"}`}>
        <div className="flex flex-col md:flex-row items-center justify-start gap-4">
          <NumberInput
            label="Unit Price*"
            type="text"
            placeholder="Unit Price"
            value={isUnitPrice}
            onChange={setIsUnitPrice}
          />
          <div className="flex flex-row items-center gap-4">
            <input
              type="checkbox"
              style={{ width: "20px", height: "20px" }}
              checked={isIncludeGst}
              onChange={handleIncludeGst}
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
          />
          <NumberInput
            label="Delivery Charge"
            type="text"
            placeholder="Delivery Charge"
            value={isDeliveryCharge}
            onChange={setIsDeliveryCharge}
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
              onChange={handleCheckboxChange}
            />
            <span>Charge tax on this product</span>
          </div>
          <select
            id="isGstPercent"
            name="isGstPercent"
            className={`outline-none border-2 border-teal-300 rounded-lg p-2 ${
              isTaxChecked === true ? "" : "hidden"
            }`}
            value={isGstPercent}
            onChange={handleGst}
          >
            <option value="">Select GST%</option>
            {gstList.map((category) => (
              <option key={category.id} value={category.gst}>
                {category.gst}%
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 pt-4">
          <NumberInput
            label="Quantity"
            type="text"
            placeholder="Quantity"
            value={isQuantity}
            onChange={setIsQuantity}
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
          />
        </div>
      </Container>
      <Container className={`${isToggle === 6 ? "flex flex-col" : "hidden"}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <p className="font-bold text-base md:text-xl">
            Search engine listing
          </p>
          <button
            onClick={() => handleToggle(1)}
            className="text-sm md:text-lg text-teal-700 px-4 py-1 rounded-md border border-teal-700"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-start text-xs gap-4 px-4">
          Add a title and description to see how this product might appear in a
          search engine listing
        </div>
      </Container>

      <Container>
        <div className={`${isToggle === 1 ? "flex" : "hidden"} justify-end`}>
          <button
            onClick={() => handleToggle(2)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkNext />
          </button>
        </div>
        <div
          className={`${isToggle === 2 ? "flex" : "hidden"} justify-between`}
        >
          <button
            onClick={() => handleToggle(1)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={() => handleToggle(3)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkNext />
          </button>
        </div>
        <div
          className={`${isToggle === 3 ? "flex" : "hidden"} justify-between`}
        >
          <button
            onClick={() => handleToggle(2)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={() => handleToggle(4)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkNext />
          </button>
        </div>
        <div
          className={`${isToggle === 4 ? "flex" : "hidden"} justify-between`}
        >
          <button
            onClick={() => handleToggle(3)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={() => handleToggle(5)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkNext />
          </button>
        </div>
        <div
          className={`${isToggle === 5 ? "flex" : "hidden"} justify-between`}
        >
          <button
            onClick={() => handleToggle(4)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={() => handleToggle(6)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkNext />
          </button>
        </div>
        <div
          className={`${isToggle === 6 ? "flex" : "hidden"} justify-between`}
        >
          <button
            onClick={() => handleToggle(5)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={(e) => handelSubmit(e)}
            className="text-sm md:text-lg text-white px-6 py-1 rounded-md bg-teal-700"
          >
            Submit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default ProductAdd;
