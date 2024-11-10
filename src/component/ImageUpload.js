import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import imageCompression from "browser-image-compression";

const MAX_IMAGE_SIZE_KB = 512; // Set maximum upload size to 512 KB

const ImageUpload = ({ onImageUpload, initialLabel }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState(0);

  const handleImageChange = async (imageList) => {
    if (imageList.length > 0) {
      setLoading(true);
      const file = imageList[0].file;

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        const sizeInKB = compressedFile.size / 1024;
        setImageSize(sizeInKB);

        if (sizeInKB <= MAX_IMAGE_SIZE_KB) {
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onloadend = () => {
            setImage(reader.result);
            if (onImageUpload) {
              onImageUpload(reader.result);
            }
          };
        } else {
          console.warn("Image size exceeds the 512 KB limit.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during image compression:", error);
        setLoading(false);
      }
    }
  };

  return (
    <ImageUploading
      single
      value={null}
      onChange={handleImageChange}
      maxNumber={1}
      maxFileSize={10485760}
    >
      {({ onImageUpload: handleUpload, dragProps }) => (
        <div className="upload__image-wrapper flex justify-center py-4">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <button
                className="border-2 shadow-lg p-2"
                onClick={handleUpload}
                {...dragProps}
              >
                {image ? "Change Image" : initialLabel}
              </button>
              {image ? (
                <div style={{ width: "40%" }} className="mt-2 h-60">
                  <img src={image} alt="Uploaded preview" />
                  <p
                    className={`mt-2 ${
                      imageSize > MAX_IMAGE_SIZE_KB
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    Current image size: {imageSize.toFixed(2)} KB
                  </p>
                </div>
              ) : (
                <div style={{ width: "40%" }} className="mt-2">
                  <img src="/userProfile.png" alt="Uploaded preview" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUpload;
