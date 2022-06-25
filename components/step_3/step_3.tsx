import { useStore, useEditorStore } from "../../hooks/useStore";
import { ProgressBar } from "../snippet_editor/progress_bar";
import { useRouter } from "next/router";
import { Steps, StepProps } from "../../types/steps";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import Image from "next/image";

const uploadToIPFS = async ({ data }: any) => {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: data,
  });

  const receivedData = await res.json();
  return receivedData.IpfsHash;
};

const uploadJSONToIPFS = async ({ data }: any) => {
  const res = await fetch("/api/upload_json", {
    method: "POST",
    body: data,
  });

  const receivedData = await res.json();
  return receivedData.IpfsHash;
};

interface CreateMetadataProps {
  imageData: string;
  nftName: string;
  description: string;
  color: string;
  fontSize: string;
  windowColor: string;
  lang: string;
}

const createMetaData = async ({
  imageData,
  nftName,
  description,
  color,
  fontSize,
  windowColor,
  lang,
}: CreateMetadataProps) => {
  console.log("uploading data", imageData);
  const image_hash = await uploadToIPFS(imageData);
  const image_uri = `ipfs://${image_hash}`;
  console.log("image_uri", image_uri);
  let metadata = {
    name: nftName,
    description,
    image: image_uri,
    atrributes: [
      {
        trait_type: "Color",
        value: color,
      },
      {
        trait_type: "Font Size",
        value: fontSize,
      },
      {
        trait_type: "Window Color",
        value: windowColor,
      },
      {
        trait_type: "Language",
        value: lang,
      },
    ],
  };

  console.log("metadata", metadata);

  const metadata_hash = await uploadJSONToIPFS(metadata);
  const token_uri = `ipfs://${metadata_hash}`;
  return token_uri;
};

export default function Step_3({ step, next_page }: StepProps) {
  const router = useRouter();
  const [image_data, nft_name, description, image_size, blob] = useStore(
    (state) => [
      state.image_data,
      state.nft_name,
      state.description,
      state.image_size,
      state.blob,
    ]
  );
  const [color, lang, windowColor, fontSize] = useEditorStore((state) => [
    state.color,
    state.lang,
    state.windowColor,
    state.fontSize,
  ]);
  const { account } = useEthers();
  const isConnected = account !== undefined;
  const [isMinting, setIsMinting] = useState<Boolean>(false);

  const handleClick = async () => {
    setIsMinting(true);
    // const token_uri = await createMetaData({
    //   imageData: image_data,
    //   nftName: nft_name,
    //   description,
    //   color,
    //   fontSize: fontSize.toString(),
    //   windowColor,
    //   lang,
    // });

    const response = await fetch("/api/upload_nft_storage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nft_name, description, blob }),
    });
    const receivedData = await response.json();
    alert(`your token uri is ${receivedData.IpfsHash}`);
    router.push(next_page);
  };

  return (
    <>
      <h3 className="pt-2 pb-2">Mint NFT</h3>
      <div className="grid grid-cols-[2fr_1fr]">
        <div>
          <Image
            src={image_data}
            alt="preview NFT"
            width={image_size.width}
            height={image_size.height}
          />
        </div>
        <div className="flex flex-column items-center mx-auto p-2">
          <strong>
            {isConnected
              ? `
             Now you can mint your NFT. Please be patient - it may take a
             couple of seconds 👇
            `
              : "Connect your wallet on top of the page"}
          </strong>
        </div>
      </div>
      <button className="btn btn-primary mt-5 w-full" onClick={handleClick}>
        {isMinting ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          Steps[step].split("_").join(" ")
        )}
      </button>
      <ProgressBar step={step} />
    </>
  );
}
