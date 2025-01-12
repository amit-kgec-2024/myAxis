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

const BrandEdit = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [parentcategoryId, setParentcategoryId] = useState("");
  const [isImage, setImages] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState("");

  const dataListGet = async (page = 1) => {
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
  const defaultCategory =
    list.find((item) => item.id === parentcategoryId) || {};

  const dataFetch = async (id) => {
    try {
      const response = await fetch(environment.apiUrl + `brand/view/${id}`);
      const data = await response.json();
      // console.log(data, "----------------->");
      setBrandName(data.data?.brandName);
      setImages(data.data?.src);
      setParentcategoryId(data.data?.parentcategoryId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const brandId = sessionStorage.getItem("brandId");
    setBrandId(brandId);
    dataFetch(brandId);
  }, []);

  const handelSubmit = async (id) => {
    const data = {
      brandName: brandName,
      src: isImage,
    };
    try {
      const response = await fetch(environment.apiUrl + `brand/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Brand Edit SuccesFully");
      router("/brand-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Edit Brands</H1>
      </Container>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <CategoryDrop
            label="Parent Category"
            defaultValue={defaultCategory}
            onChange={setParentcategoryId}
            options={list}
          />
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
            onClick={() => handelSubmit(brandId)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Update
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default BrandEdit;
