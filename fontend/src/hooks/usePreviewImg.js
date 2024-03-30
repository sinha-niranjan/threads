import { useState } from "react";
import useShowToast from "./useShowToast";
import Resizer from "react-image-file-resizer";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        Resizer.imageFileResizer(
          file,
          500,
          500,
          file.type === "image/jpeg" ? "JPEG" : "PNG",
          100,
          0,
          (resizedImg) => {
            setImgUrl(resizedImg);
            //   console.log(resizedImg);
          },
          "base64"
        );
          // setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", " Please select an image file", "error");
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
