import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import Container from "../../component/tag/Container";
import H1 from "../../component/tag/H1";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import { environment } from "../../enviroment/enviroment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ParentcategoryEdit = () => {
  const router = useNavigate();
  const [isImage, setImages] = useState("");
  const [parentcategoryName, setParentcategoryName] = useState("");
  const [parentcategoryId, setParentcategoryId] = useState("");

  const dataFetch = async (id) => {
    try {
      const response = await fetch(
        environment.apiUrl + `parentcategory/view/${id}`
      );
      const data = await response.json();
      console.log(data, "----------------->");
      setParentcategoryName(data.data?.parentCategoryName);
      setImages(data.data?.src);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const parentcategoryId = sessionStorage.getItem("parentcategoryId");
    setParentcategoryId(parentcategoryId);
    dataFetch(parentcategoryId);
  }, []);
  const handelSubmit = async (id) => {
    const data = {
      parentCategoryName: parentcategoryName,
      src: isImage,
    };
    try {
      const response = await fetch(
        environment.apiUrl + `parentcategory/update/${id}`,
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
      router("/parentcategory-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Edit Parent Category</H1>
      </Container>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Input
            label="Parent Category Name"
            type="text"
            placeholder="Parent Category Name"
            value={parentcategoryName}
            onChange={setParentcategoryName}
          />
          <ImageUploads value={isImage} onChange={setImages} />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handelSubmit(parentcategoryId)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Submit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default ParentcategoryEdit;
