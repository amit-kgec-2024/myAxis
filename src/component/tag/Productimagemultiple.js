import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

const ProductImageMultiple = ({ value = [], onChange, redOnly = false }) => {
  const [images, setImages] = useState(value);
  const [imageSizeMessage, setImageSizeMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");

  useEffect(() => {
    setImages(value);
  }, [value]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const maxSize = 512 * 1024;

    if (file) {
      const sizeInKB = (file.size / 1024).toFixed(2);

      if (file.size > maxSize) {
        setImageSizeMessage(`Image size: ${sizeInKB} KB exceeds 512KB.`);
        setMessageColor("red");
        return;
      }
      setImageSizeMessage(`Image size: ${sizeInKB} KB`);
      setMessageColor("green");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const updatedImages = [...images];
        updatedImages[index] = { src: reader.result };
        setImages(updatedImages);
        onChange(updatedImages);
      };
    }
  };

  const handleAddInput = () => {
    setImages([...images, { src: "" }]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {!redOnly && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
              )}
              <div className="flex flex-row items-end">
                {image.src && (
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={image.src}
                      alt={`Uploaded ${index}`}
                      className="w-28 h-28 object-contain border"
                    />
                    <p style={{ color: messageColor }}>{imageSizeMessage}</p>
                  </div>
                )}
                {!redOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-600 text-white px-1 py-1 rounded-full"
                  >
                    <CiCircleRemove />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {!redOnly && (
          <button
            type="button"
            onClick={handleAddInput}
            className="bg-blue-500 text-white px-2 py-2 rounded-full"
          >
            <IoIosAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImageMultiple;
