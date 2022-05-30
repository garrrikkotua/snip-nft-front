import { useState } from "react";
import { PopoverPicker } from "../color_picker";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);
import { LanguageHLJS } from "../../types/language";
import {
  CodeStyles,
  DEFAULT_SELECTED_CODE_STYLE,
} from "../../types/code_styles";
import html2canvas from "html2canvas";
import { StyleSelector } from "./style_selector";
import { FontSizeSelector } from "./font_size_selector";
import { LanguageSelector } from "./language_selector";
import { ProgressBar } from "./progress_bar";
import { CodeEditor } from "./code_editor";
import { MetadataEditor } from "./metadata_editor";
import { Minter } from "./minter";
import { useStore } from "../../hooks/useStore";
import { DEFAULT_FONT_SIZE } from "../../types/font_size";
import { DEFAULT_SELECTED_LANG } from "../../types/language";

enum Steps {
  Create_Image,
  Add_Description,
  Mint_NFT,
  View_On_OpenSea,
}

const EditorHeadings = {
  0: "Snippet Editor",
  1: "Description Editor",
  2: "Preview your NFT",
  3: "View on OpenSea",
};

const ToolTips = {
  0: "Add your code, choose colors, style and language",
  1: "This description will be shown alongside NFT on a marketplace",
  2: "Choose network where you want to mint NFT",
  3: "Preview it on OpenSea",
};

interface SwtitcherProps {
  step: Steps;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const SnippetEditor = () => {
  const [lang, setLang] = useState<LanguageHLJS | string>(
    DEFAULT_SELECTED_LANG
  );
  const [color, setColor] = useState<string>("#DB88D6");
  const [codeStyle, setCodeStyle] = useState<CodeStyles>(
    DEFAULT_SELECTED_CODE_STYLE
  );
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const [windowStyle, setWindowStyle] = useState<boolean>(true);
  const [windowColor, setWindowColor] = useState<string>("#E1A5DD");
  const [currentStep, setCurrentStep] = useState<number>(Steps.Create_Image);

  const imageData = useStore((state) => state.image_data);
  const setImageData = useStore((state) => state.setImageData);
  const description = useStore((state) => state.description);
  const nftName = useStore((state) => state.nft_name);

  const Switcher = ({ step }: SwtitcherProps) => {
    switch (step) {
      case Steps.Create_Image:
        return (
          <CodeEditor
            lang={lang}
            fontSize={fontSize}
            color={color}
            windowStyle={windowStyle}
            windowColor={windowColor}
            codeStyle={codeStyle}
          />
        );
      case Steps.Add_Description:
        return (
          <MetadataEditor
            language={capitalizeFirstLetter(lang)}
            color={color}
          />
        );
      case Steps.Mint_NFT:
        return <Minter />;
      default:
        return <div></div>;
    }
  };

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

  const createMetaData = async () => {
    const image_hash = await uploadToIPFS(imageData);
    const image_uri = `ipfs://${image_hash}`;
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

    const metadata_hash = await uploadJSONToIPFS(metadata);
    const token_uri = `ipfs://${metadata_hash}`;
    return token_uri;
  };

  const createImage = async () => {
    const element = document.querySelector("#capture");
    const canvas = await html2canvas(element as HTMLElement, {
      ignoreElements: (el) => el.id == "underlyingTextarea",
    });

    // const ctx = canvas.getContext("2d");
    // if (ctx) {
    //   console.log("adding wm");
    //   // Set fill size and font, style

    //   ctx.textBaseline = "top"; // start with drawing text from top
    //   ctx.font = "20px sans-serif"; // set a font and size
    //   ctx.fillStyle = "red"; // set a color for the text
    //   ctx.fillText("WATERMARK", 20, 20);
    // }

    const data = canvas.toDataURL("image/png");
    setImageData(data);
  };

  const switchStep = async () => {
    switch (currentStep) {
      case Steps.Create_Image:
        await createImage();
        setCurrentStep((currentStep + 1) % Object.keys(Steps).length);
      case Steps.Add_Description:
        setCurrentStep((currentStep + 1) % Object.keys(Steps).length);
      case Steps.Mint_NFT:
        setCurrentStep((currentStep + 1) % Object.keys(Steps).length);
    }
  };

  return (
    <>
      <div className="w-[70vw] bg-white rounded-xl shadow-lg flex flex-col px-3 pt-0 pb-2">
        <div className="grid md:grid-cols-[40%_20%_40%] grid-rows-3 md:grid-rows-none h-28 md:h-12 justify-items-stretch content-center items-center">
          <div
            className="grid grid-cols-3 gap-2 h-12 row-start-2 md:row-start-auto content-center items-center"
            style={{ display: currentStep > 0 ? "none" : "" }}
          >
            <PopoverPicker color={color} onChange={setColor} disabled={false} />
            <StyleSelector setCodeStyle={setCodeStyle} />
            <FontSizeSelector setFontSize={setFontSize} />
          </div>
          <h3
            className={
              "font-bold justify-self-center self-center row-start-1 md:row-start-auto tooltip tooltip-primary " +
              (currentStep > 0 ? "col-span-3" : "")
            }
            data-tip={ToolTips[currentStep]}
          >
            {EditorHeadings[currentStep]}
          </h3>
          <div
            className="grid grid-cols-3 gap-2 h-12 row-start-3 md:row-start-auto content-center items-center"
            style={{ display: currentStep > 0 ? "none" : "" }}
          >
            <PopoverPicker
              color={windowColor}
              onChange={setWindowColor}
              disabled={!windowStyle}
            />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Window</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={windowStyle}
                  onChange={() => setWindowStyle(!windowStyle)}
                />
              </label>
            </div>
            <LanguageSelector setLang={setLang} />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            switchStep();
          }}
        >
          <Switcher step={currentStep} />
          <button className="btn btn-primary mt-5 w-full" type="submit">
            {Steps[currentStep].split("_").join(" ")}
          </button>
        </form>
        <ProgressBar step={currentStep} />
      </div>
    </>
  );
};
