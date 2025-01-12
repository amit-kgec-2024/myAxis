import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";

const BannerList = () => {
  const nevigator = useNavigate();
  const [isAppliance, setAppliance] = useState();
  const [isHom, setHom] = useState();
  const [isBeauty, setBeauty] = useState();
  const [isElectronics, setElectronics] = useState();
  const [isFashion, setFashion] = useState();
  const [isFurniture, setFurniture] = useState();
  const [isGrocery, setGrocery] = useState();
  const [isKitchen, setKitchen] = useState();
  const [isMobile, setMobile] = useState();
  console.log("---------------[--->", isHom);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const homeData = await fetch(environment.apiUrl + "banner/home/length");
      const homeJson = await homeData.json();
      setHom(homeJson.list);

      const applianceData = await fetch(
        environment.apiUrl + "banner/appliance/length"
      );
      const applianceJson = await applianceData.json();
      setAppliance(applianceJson.list);

      const beautyData = await fetch(
        environment.apiUrl + "banner/beauty/length"
      );
      const beautyJson = await beautyData.json();
      setBeauty(beautyJson.list);

      const electronicsData = await fetch(
        environment.apiUrl + "banner/electronics/length"
      );
      const electronicsJson = await electronicsData.json();
      setElectronics(electronicsJson.list);

      const fashionData = await fetch(
        environment.apiUrl + "banner/fashion/length"
      );
      const fashionJson = await fashionData.json();
      setFashion(fashionJson.list);

      const furnitureData = await fetch(
        environment.apiUrl + "banner/furniture/length"
      );
      const furnitureJson = await furnitureData.json();
      setFurniture(furnitureJson.list);

      const groceryData = await fetch(
        environment.apiUrl + "banner/grocery/length"
      );
      const groceryJson = await groceryData.json();
      setGrocery(groceryJson.list);

      const kitchenData = await fetch(
        environment.apiUrl + "banner/kitchen/length"
      );
      const kitchenJson = await kitchenData.json();
      setKitchen(kitchenJson.list);

      const mobileData = await fetch(
        environment.apiUrl + "banner/mobile/length"
      );
      const mobileJson = await mobileData.json();
      setMobile(mobileJson.list);
    } catch (error) {
      console.log(error);
    }
  };
  const list = [
    { name: "Home", path: "/banner/home", count: isHom },
    { name: "Appliance", path: "/banner/appliance", count: isAppliance },
    { name: "Beauty", path: "/banner/beauty", count: isBeauty },
    { name: "Electronics", path: "/banner/electronics", count: isElectronics },
    { name: "Fashion", path: "/banner/fashion", count: isFashion },
    { name: "Furniture", path: "/banner/furniture", count: isFurniture },
    { name: "Grocery", path: "/banner/grocery", count: isGrocery },
    { name: "Kitchen", path: "/banner/kitchen", count: isKitchen },
    { name: "Mobile", path: "/banner/mobile", count: isMobile },
  ];
  return (
    <Layout>
      <div className="p-4 flex flex-wrap w-full gap-4">
        {list.map((ele, index) => (
          <button
            key={index}
            onClick={() => nevigator(ele.path)}
            className="flex w-[24%] py-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white border rounded-md shadow-md"
          >
            <div className="w-[30%] p-4 text-3xl text-center">
              <span className="">{ele.count ? ele.count : 0}</span>
            </div>
            <div className="w-[70%] p-4 text-3xl text-start">{ele.name}</div>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default BannerList;
