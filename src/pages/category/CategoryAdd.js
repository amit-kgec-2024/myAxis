import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import ImageUploads from "../../component/tag/ImageUploads";
import Input from "../../component/tag/Input";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import CategoryDrop from "../../component/tag/CategoryDrop";
import { environment } from "../../enviroment/enviroment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryAdd = () => {
  const router = useNavigate();
  const [list, islist] = useState([]);
  const [isImage, setImages] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parentcategoryId, setParentCategoryId] = useState("");

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

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const data = {
      categoryName: categoryName,
      src: isImage,
      parentcategoryId: parentcategoryId,
    };
    try {
      const response = await fetch(environment.apiUrl + "category/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
      toast.success("Category Add SuccesFully");
      router("/category-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };

  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Add Category</H1>
      </Container>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "10px",
          }}
        >
          <CategoryDrop
            label="Parent Category"
            options={list}
            onChange={setParentCategoryId}
          />
          <Input
            label="Category Name"
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={setCategoryName}
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

export default CategoryAdd;
