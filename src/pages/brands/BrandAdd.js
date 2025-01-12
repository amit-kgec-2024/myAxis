import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import { environment } from "../../enviroment/enviroment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CategoryDrop from "../../component/tag/CategoryDrop";

const BrandAdd = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [isImage, setImages] = useState("");
  const [brandName, setBrandName] = useState("");
  const [parentcategoryId, setParentCategoryId] = useState("");

  const dataListGet = async () => {
    try {
      const response = await fetch(
        environment.apiUrl + "parentcategory/active/list"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataList = await response.json();
      islist(dataList.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataListGet();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const data = {
      brandName: brandName,
      src: isImage,
      parentcategoryId: parentcategoryId,
    };
    try {
      const response = await fetch(environment.apiUrl + "brand/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Brand Add SuccesFully");
      router("/brand-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Add Brands</H1>
      </Container>
      <Container>
        <CategoryDrop
          label="Parent Category"
          options={list}
          onChange={setParentCategoryId}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Input
            label="Brand Name"
            type="text"
            placeholder="Brand Name"
            value={brandName}
            onChange={setBrandName}
          />
          <ImageUploads value={isImage} onChange={setImages} />
        </div>
        <div className="flex justify-end">
          <button
            onClick={(e) => handelSubmit(e)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Submit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default BrandAdd;
