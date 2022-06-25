import { StyleSelector } from "../snippet_editor/style_selector";
import { FontSizeSelector } from "../snippet_editor/font_size_selector";
import { LanguageSelector } from "../snippet_editor/language_selector";
import { ToolTips, EditorHeadings } from "../../types/steps";
import { PopoverPicker } from "../color_picker";
import { CodeEditor } from "../snippet_editor/code_editor";
import { ProgressBar } from "../snippet_editor/progress_bar";
import { Steps, StepProps } from "../../types/steps";
import { useRouter } from "next/router";
import { useEditorStore, useStore } from "../../hooks/useStore";
import domtoimage from "dom-to-image";

const LeftControls = () => {
  const [color, setColor, setCodeStyle, setFontSize] = useEditorStore(
    (state) => [
      state.color,
      state.setColor,
      state.setCodeStyle,
      state.setFontSize,
    ]
  );
  return (
    <div className="grid grid-cols-3 gap-2 h-12 row-start-2 md:row-start-auto content-center items-center">
      <PopoverPicker color={color} onChange={setColor} disabled={false} />
      <StyleSelector setCodeStyle={setCodeStyle} />
      <FontSizeSelector setFontSize={setFontSize} />
    </div>
  );
};

const RightControls = () => {
  const [windowColor, setWindowColor, windowStyle, setWindowStyle, setLang] =
    useEditorStore((state) => [
      state.windowColor,
      state.setWindowColor,
      state.windowStyle,
      state.setWindowStyle,
      state.setLang,
    ]);
  return (
    <div className="grid grid-cols-3 gap-2 h-12 row-start-3 md:row-start-auto content-center items-center">
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
  );
};

export default function Step_1({ step, next_page }: StepProps) {
  const router = useRouter();
  const [setImageData, setImageSize, setBlob] = useStore((state) => [
    state.setImageData,
    state.setImageSize,
    state.setBlob,
  ]);

  const createImage = () => {
    const element = document.getElementById("editor-area");
    const width = element?.clientWidth;
    const height = element?.clientHeight;
    function filter(node: any) {
      return node.id !== "underlyingTextarea";
    }

    //createing data_url from element
    domtoimage
      .toPng(element as Node, {
        filter,
        width: width,
        height: height,
        style: { overflow: "hidden" },
      })
      .then(function (dataUrl) {
        setImageData(dataUrl);
        setImageSize({
          //@ts-ignore
          width: width,
          //@ts-ignore
          height: height,
        });
      })
      .catch(function (error) {
        console.error(
          "oops, something went wrong when rendering image!",
          error
        );
      });

    //creating blob from element for file upload
    domtoimage
      .toBlob(element as Node, {
        filter,
        width: width,
        height: height,
        style: { overflow: "hidden" },
      })
      .then(function (blob) {
        console.log(blob);
        setBlob(blob);
      })
      .catch(function (error) {
        console.error(
          "oops, something went wrong when rendering image!",
          error
        );
      });
  };

  return (
    <>
      <div className="grid md:grid-cols-[40%_20%_40%] grid-rows-3 md:grid-rows-none h-28 md:h-12 justify-items-stretch content-center items-center">
        <LeftControls />
        <h3
          className={
            "font-bold justify-self-center self-center row-start-1 md:row-start-auto tooltip tooltip-primary"
          }
          data-tip={ToolTips[step]}
        >
          {EditorHeadings[step]}
        </h3>
        <RightControls />
      </div>
      <CodeEditor />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createImage();
          router.push(next_page);
        }}
      >
        <button className="btn btn-primary mt-5 w-full" type="submit">
          {Steps[step].split("_").join(" ")}
        </button>
      </form>
      <ProgressBar step={step} />
    </>
  );
}
