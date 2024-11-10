import React, { useEffect, useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import {
  optionStars,
  optionCategoryAppliances,
  optionSale,
} from "../../../utils/dropdown";
import ProductCard from "../ProductCard";
import { FaPlus } from "react-icons/fa";
import Layout from "../../layout/Layout";

const AdminAppliances = () => {
  const [isRegister, setIsRegister] = useState(false);
  // GET request............
  const [getData, setGetdata] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://e-commerce-nu-seven.vercel.app/api/appliances/data"
      );
      const jsonData = await res.json();
      setGetdata(jsonData);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  // POST request...........
  const [product, setProduct] = useState({
    img: "",
    title: "",
    models: "",
    price: "",
    discount: "",
    stars: "",
    category: "",
    sale: "",
  });

  // Image POST Uploads...............
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", product.img);
    formData.append("upload_preset", "e-commerse-react");
    formData.append("cloud_name", "dn2tlzn9b");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dn2tlzn9b/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.status === 200) {
      return await res.json();
    } else {
      return "Error";
    }
  };
  // image POST MongoDB
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { secure_url } = await uploadImage();
    setImgUrl(secure_url);
    console.log(imgUrl, "ImhUrl :>>");
    const res = await fetch(
      "https://e-commerce-nu-seven.vercel.app/api/appliances/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgUrl: secure_url,
          title: product.title,
          price: product.price,
          models: product.models,
          stars: product.stars,
          discount: product.discount,
          category: product.category,
          sale: product.sale,
        }),
      }
    );
    fetchData();
    if (res.status === 400) {
      alert("Invalid Credintial!");
    } else {
      await res.json();
    }
  };

  // Delete Products..................
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-nu-seven.vercel.app/api/appliances/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchData();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-teal-500 text-white p-4 flex flex-row justify-between items-center">
        <h1>Beauty</h1>
        {isRegister ? (
          <button
            onClick={() => setIsRegister(false)}
            className="flex items-center px-4 py-1 bg-yellow-400 gap-3"
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => setIsRegister((prev) => !prev)}
            className="flex items-center px-4 py-1 bg-yellow-400 gap-3"
          >
            <FaPlus />
            New
          </button>
        )}
      </div>
      {isRegister && (
        <div className="flex flex-col p-5 items-start justify-start w-full">
          <form
            className="w-full flex flex-col"
            onSubmit={(e) => handelSubmit(e)}
          >
            <div className="flex gap-4">
              <Input
                label="Title"
                type="text"
                name="title"
                id="title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
              <Input
                label="Price"
                type="price"
                name="price"
                id="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <Input
                label="Discount"
                type="discount"
                name="discount"
                id="discount"
                value={product.discount}
                onChange={(e) =>
                  setProduct({ ...product, discount: e.target.value })
                }
              />
              <Input
                label="Models"
                type="models"
                name="models"
                id="models"
                value={product.models}
                onChange={(e) =>
                  setProduct({ ...product, models: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 items-start justify-start">
              <Input
                type="file"
                name="image"
                className="hidden"
                onChange={(e) =>
                  setProduct({ ...product, img: e.target.files[0] })
                }
                isRequired={false}
              />
              <label
                htmlFor="image"
                className="p-4 cursor-pointer border shadow w-full"
              >
                {product?.img?.name || "Upload Images"}
              </label>
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="stars"
                value={product.stars}
                onChange={(e) =>
                  setProduct({ ...product, stars: e.target.value })
                }
              >
                <h1>Get select Stars</h1>
                <select className="form-select outline-none border">
                  {optionStars.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <h1>Get select Catagories</h1>
                <select className="form-select outline-none border">
                  {optionCategoryAppliances.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div
                className="w-full p-2 border rounded mb-3 lg:mb-4"
                id="sale"
                value={product.sale}
                onChange={(e) =>
                  setProduct({ ...product, sale: e.target.value })
                }
              >
                <h1>Get select Sale</h1>
                <select className="form-select outline-none border">
                  {optionSale.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="">
              <Button type="submit" label="Add Product" />
            </div>
          </form>
        </div>
      )}
      {/* 0000000 */}
      {!isRegister && (
        <div className="w-full overflow-hidden">
          {getData
            .slice()
            .reverse()
            .map((e, index) => (
              <ProductCard
                key={index}
                id={e.product.id}
                title={e.product.title}
                img={e.product.img}
                price={e.product.price}
                discount={e.product.discount}
                category={e.product.category}
                sale={e.product.sale}
                stars={e.product.stars}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminAppliances;
