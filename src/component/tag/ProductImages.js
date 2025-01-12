import React, { useState, useEffect } from "react";

const ProductImage = ({ value, onChange, redOnly = false }) => {
  const [base64Image, setBase64Image] = useState(value || "");
  const [imageSizeMessage, setImageSizeMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [currentImageSize, setCurrentImageSize] = useState(0);
  console.log(currentImageSize);

  useEffect(() => {
    setBase64Image(value);
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 512 * 1024;

    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);

      if (file.size > maxSize) {
        setImageSizeMessage(`Image size: ${sizeInKB} KB exceeds 512KB.`);
        setMessageColor("red");
        setBase64Image("");
        setCurrentImageSize(0);
        onChange("");
      } else {
        setImageSizeMessage(`Image size: ${sizeInKB} KB`);
        setMessageColor("green");
        setCurrentImageSize(sizeInKB);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setBase64Image(reader.result);
          onChange(reader.result);
        };
      }
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center">
        {redOnly === false ? (
          <input
            className="p-4"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        ) : (
          <></>
        )}
        {base64Image ? (
          <img
            src={base64Image}
            alt="Uploaded"
            className="object-contain w-[100px] h-[100px]"
          />
        ) : (
          <img
            src="/defaultProduct.png"
            alt="Uploaded"
            className="object-contain h-[100px] w-[100px]"
          />
        )}
        {imageSizeMessage && (
          <p style={{ color: messageColor }}>{imageSizeMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
