import { NextPage } from "next";
import { useStore } from "../hooks/useStore";

const PreviewImage: NextPage = () => {
  const imageData = useStore((state) => state.image_data);

  return (
    <div>
      <h1>Here is the image preview:</h1>
      <img src={imageData} />
    </div>
  );
};

export default PreviewImage;
