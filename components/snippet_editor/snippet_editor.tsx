import { useState } from "react";
import { PopoverPicker } from "../color_picker";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);
import { LanguageHLJS } from "../../types/language";
import { CodeStyles } from "../../types/code_styles";
import html2canvas from "html2canvas";
import { StyleSelector } from "./style_selector";
import { FontSizeSelector } from "./font_size_selector";
import { LanguageSelector } from "./language_selector";
import { ProgressBar } from "./progress_bar";
import { CodeEditor } from "./code_editor";
import { MetadataEditor } from "./metadata_editor";
import { Minter } from "./minter";
import { useStore } from "../../hooks/useStore";

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
  const [lang, setLang] = useState<LanguageHLJS | string>("python");
  const [color, setColor] = useState<string>("#DB88D6");
  const [codeStyle, setCodeStyle] = useState<CodeStyles>("vs");
  const [fontSize, setFontSize] = useState<number>(12);
  const [windowStyle, setWindowStyle] = useState<boolean>(true);
  const [windowColor, setWindowColor] = useState<string>("#E1A5DD");
  const [currentStep, setCurrentStep] = useState<number>(Steps.Create_Image);

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

  const createImage = async () => {
    const element = document.querySelector("#capture");
    const canvas = await html2canvas(element as HTMLElement, {
      ignoreElements: (el) => el.id == "underlyingTextarea",
    });

    // const data = canvas.toDataURL("image/png");

    // const ipfs_hash = uploadToIPFS(data);
  };

  const switchStep = async () => {
    switch (currentStep) {
      case Steps.Create_Image:
        await createImage();
        setCurrentStep((currentStep + 1) % Object.keys(Steps).length);
      case Steps.Add_Description:
        setCurrentStep((currentStep + 1) % Object.keys(Steps).length);
    }
  };

  return (
    <>
      <div className="w-[70vw] min-h-[300px] min-w-[1000px] bg-white rounded-xl shadow-lg flex flex-col px-3 pt-0 pb-2">
        <div className="grid grid-cols-[40%_20%_40%] h-12 justify-items-stretch content-center items-center">
          <div
            className="grid grid-cols-3 gap-2 h-12 content-center items-center"
            style={{ display: currentStep > 0 ? "none" : "" }}
          >
            <PopoverPicker color={color} onChange={setColor} disabled={false} />
            <StyleSelector setCodeStyle={setCodeStyle} />
            <FontSizeSelector setFontSize={setFontSize} />
          </div>
          <h3
            className={
              "font-bold justify-self-center self-center tooltip tooltip-primary " +
              (currentStep > 0 ? "col-span-3" : "")
            }
            data-tip={ToolTips[currentStep]}
          >
            {EditorHeadings[currentStep]}
          </h3>
          <div
            className="grid grid-cols-3 gap-2 h-12 content-center items-center"
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
                  className="toggle"
                  checked={windowStyle}
                  onChange={() => setWindowStyle(!windowStyle)}
                />
              </label>
            </div>
            <LanguageSelector setLang={setLang} />
          </div>
        </div>
        <Switcher step={currentStep} />
        <button className="btn btn-primary mt-5" onClick={switchStep}>
          {Steps[currentStep].split("_").join(" ")}
        </button>
        <ProgressBar step={currentStep} />
      </div>
    </>
  );
};
