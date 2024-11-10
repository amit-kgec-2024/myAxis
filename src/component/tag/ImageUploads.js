import React, { useState, useEffect } from "react";

const ImageUploads = ({ value, onChange, redOnly = false }) => {
  const [base64Image, setBase64Image] = useState(value || "");
  const [imageSizeMessage, setImageSizeMessage] = useState("");
  const [currentImageSize, setCurrentImageSize] = useState(0);
  const [messageColor, setMessageColor] = useState("green");

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
      {redOnly === false ? (
        <div className="">
          <input
            className="shadow p-4"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageSizeMessage && (
            <p style={{ color: messageColor }}>{imageSizeMessage}</p>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="border shadow w-44 h-44 my-5">
        {base64Image ? (
          <img src={base64Image} alt="Uploaded" className="w-44 h-40" />
        ) : (
          <div className="w-44 h-44 flex items-center justify-center">
            <h1 className="font-bold text-lg md:text-xl text-slate-500">
              Upload Image
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploads;
