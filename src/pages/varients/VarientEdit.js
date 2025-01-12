import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import H1 from "../../component/tag/H1";
import Container from "../../component/tag/Container";
import Input from "../../component/tag/Input";
import { environment } from "../../enviroment/enviroment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VarientEdit = () => {
  const router = useNavigate();
  const [varientName, setVarientName] = useState("");
  const [varientId, setVarientId] = useState("");

  const dataFetch = async (id) => {
    try {
      const response = await fetch(environment.apiUrl + `varient/view/${id}`);
      const data = await response.json();
      setVarientName(data.data?.varientName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const varientId = sessionStorage.getItem("varientId");
    setVarientId(varientId);
    dataFetch(varientId);
  }, []);

  const handelSubmit = async (id) => {
    const data = {
      varientName: varientName,
    };
    try {
      const response = await fetch(
        environment.apiUrl + `varient/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await response.json();
      toast.success("Brand Edit SuccesFully");
      router("/varient-list");
    } catch (error) {
      console.log(error);
      toast.error("Error Server", error);
    }
  };
  return (
    <Layout>
      <Container className="flex flex-row items-center justify-between">
        <H1>Edit Varient</H1>
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
            label="Brand Name"
            type="text"
            placeholder="Brand Name"
            value={varientName}
            onChange={setVarientName}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handelSubmit(varientId)}
            className="text-sm md:text-lg text-white px-6 py-2 rounded-md bg-teal-700"
          >
            Update
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default VarientEdit;
