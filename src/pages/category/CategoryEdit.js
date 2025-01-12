import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import Container from "../../component/tag/Container";
import H1 from "../../component/tag/H1";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import { environment } from "../../enviroment/enviroment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryDrop from "../../component/tag/CategoryDrop";

const CategoryEdit = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [parentcategoryId, setParentcategoryId] = useState("");
  const [isImage, setImages] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

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
      const response = await fetch(environment.apiUrl + `category/view/${id}`);
      const data = await response.json();
      console.log(data, "----------------->");
      setCategoryName(data.data?.categoryName);
      setImages(data.data?.src);
      setParentcategoryId(data.data?.parentcategoryId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const categoryId = sessionStorage.getItem("categoryId");
    setCategoryId(categoryId);
    dataFetch(categoryId);
  }, []);

  const handelSubmit = async (id) => {
    const data = {
      categoryName: categoryName,
      src: isImage,
      parentcategoryId: parentcategoryId,
    };
    try {
      const response = await fetch(
        environment.apiUrl + `category/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      toast.success("parentcategory Edit SuccesFully");
      router("/category-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Edit Category</H1>
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
            label="Parent Category Name"
            type="text"
            placeholder="Parent Category Name"
            value={categoryName}
            onChange={setCategoryName}
          />
          <ImageUploads value={isImage} onChange={setImages} />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handelSubmit(categoryId)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Submit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default CategoryEdit;
