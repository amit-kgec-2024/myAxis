import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import ImageUploads from "../../component/tag/ImageUploads";
import { environment } from "../../enviroment/enviroment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ParentcategoryAdd = () => {
  const router = useNavigate();
  const [isImage, setImages] = useState("");
  const [parentcategoryName, setParentcategoryName] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault(e);
    const data = {
      parentCategoryName: parentcategoryName,
      src: isImage,
    };
    try {
      const response = await fetch(
        environment.apiUrl + "parentcategory/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      toast.success("parentcategory Add SuccesFully");
      router("/parentcategory-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };

  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Add Parent Category</H1>
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

export default ParentcategoryAdd;
