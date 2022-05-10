import { useRef, useState } from "react";
import { PopoverPicker } from "./color_picker";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);
import {
  Language,
  language,
  language_hljs,
  LanguageHLJS,
} from "../../types/language";
import code_styles_config from "../../styles/code_styles_config.json";
import { CodeStyles, code_styles } from "../../types/code_styles";
import { font_sizes } from "../../types/font_size";
import html2canvas from "html2canvas";

const DEFAULT_SELECTED_LANG = "Python";
const DEDAULT_SELECTED_CODE_STYLE = "vs";
const DEFAULT_FONT_SIZE = 12;

enum Steps {
  Create_Image,
  Add_Description,
  Mint_NFT,
  View_On_OpenSea,
}

const LanguageSelector = ({ setLang }: any) => {
  return (
    <select
      className="select select-sm justify-self-center self-center select-ghost"
      onChange={(e) =>
        setLang(language_hljs[language.indexOf(e.target.value as Language)])
      }
    >
      <option disabled selected>
        Language
      </option>
      {language.map((current_lang, index) =>
        current_lang === DEFAULT_SELECTED_LANG ? (
          <option key={index} selected={true}>
            {current_lang}
          </option>
        ) : (
          <option key={index}>{current_lang}</option>
        )
      )}
    </select>
  );
};

const FontSizeSelector = ({ setFontSize }: any) => {
  return (
    <select
      className="select select-sm select-ghost min-w-[50px]"
      onChange={(e) => setFontSize(Number(e.target.value))}
    >
      <option disabled selected>
        Font Size
      </option>
      {font_sizes.map((current_font_size, index) =>
        current_font_size === DEFAULT_FONT_SIZE ? (
          <option key={index} selected={true}>
            {current_font_size}
          </option>
        ) : (
          <option key={index}>{current_font_size}</option>
        )
      )}
    </select>
  );
};

const StyleSelector = ({ setCodeStyle }: any) => {
  return (
    <select
      className="select select-sm select-ghost min-w-[50px]"
      onChange={(e) => setCodeStyle(e.target.value)}
    >
      <option disabled selected>
        Style
      </option>
      {code_styles.map((current_code_style, index) =>
        current_code_style === DEDAULT_SELECTED_CODE_STYLE ? (
          <option key={index} selected={true}>
            {current_code_style}
          </option>
        ) : (
          <option key={index}>{current_code_style}</option>
        )
      )}
    </select>
  );
};

interface ProgressBarProps {
  step: number;
}

const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal mt-5">
      <li className="step step-primary">Create Image</li>
      <li className={"step" + (step > 0 ? " step-primary" : "")}>
        Add Description
      </li>
      <li className={"step" + (step > 1 ? " step-primary" : "")}>Mint NFT</li>
      <li className={"step" + (step > 2 ? " step-primary" : "")}>
        View on OpenSea
      </li>
    </ul>
  );
};

export const SnippetEditor = () => {
  const [lang, setLang] = useState<LanguageHLJS | string>("python");
  const [code, setCode] = useState<string>("");
  const [color, setColor] = useState<string>("#DB88D6");
  const [codeStyle, setCodeStyle] = useState<CodeStyles>("vs");
  const [fontSize, setFontSize] = useState<number>(12);
  const [windowStyle, setWindowStyle] = useState<boolean>(true);
  const [windowColor, setWindowColor] = useState<string>("#E1A5DD");
  const [currentStep, setCurrentStep] = useState<number>(Steps.Create_Image);

  const uploadToIPFS = async ({ data }: any) => {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const receivedData = await res.json();
    return receivedData.IpfsHash;
  };

  const createImage = async () => {
    alert();
    const element = document.querySelector("#capture");
    const canvas = await html2canvas(element as HTMLElement, {
      ignoreElements: (el) => el.id == "underlyingTextarea",
    });

    const data = canvas.toDataURL("image/png");

    const ipfs_hash = uploadToIPFS(data);
  };

  return (
    <>
      <div className="w-[70vw] min-h-[300px] min-w-[1000px] bg-white rounded-xl shadow-lg flex flex-col px-3 pt-0 pb-2">
        <div className="grid grid-cols-[40%_20%_40%] h-12 justify-items-stretch content-center items-center">
          <div className="grid grid-cols-3 gap-2 h-12 content-center items-center">
            <PopoverPicker color={color} onChange={setColor} disabled={false} />
            <StyleSelector setCodeStyle={setCodeStyle} />
            <FontSizeSelector setFontSize={setFontSize} />
          </div>
          <h1 className="font-bold justify-self-center self-center">
            Snippet Editor
          </h1>
          <div className="grid grid-cols-3 gap-2 h-12 content-center items-center">
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
        <div
          className={windowStyle ? "mockup-window border" : ""}
          style={{ background: windowColor }}
        >
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => hljs.highlight(code, { language: lang }).value}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: fontSize,
              background: color,
              minHeight: 300,
            }}
            id={"capture"}
            textareaId={"underlyingTextarea"}
          />
        </div>
        <style>{code_styles_config[codeStyle]}</style>
        <button className="btn btn-primary mt-5" onClick={createImage}>
          Create image
        </button>
        <ProgressBar step={currentStep} />
      </div>
    </>
  );
};
