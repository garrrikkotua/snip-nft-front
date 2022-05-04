import { useState } from "react";
import { PopoverPicker } from "./color_picker";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/common";
import { Language, language } from "../../types/language";
import code_styles_config from "../../styles/code_styles_config.json";
import { CodeStyles, code_styles } from "../../types/code_styles";

const DEFAULT_SELECTED_LANG = "Python";
const DEDAULT_SELECTED_CODE_STYLE = "vs";

export const SnippetEditor = () => {
  const [lang, setLang] = useState<Language | string>("Python");
  const [code, setCode] = useState<string>("");
  const [color, setColor] = useState<string>("#B91C1C");
  const [codeStyle, setCodeStyle] = useState<CodeStyles>("vs");

  return (
    <>
      <div className="w-[70vw] min-h-[300px] bg-white rounded-xl shadow-lg flex flex-col px-3 pt-0 pb-2">
        <div className="grid grid-cols-3 h-12 justify-items-stretch content-center items-center">
          <div className="justify-self-start self-center">
            <PopoverPicker color={color} onChange={setColor} />
            <select
              className="select select-sm justify-self-center self-center select-ghost"
              onChange={(e) => setCodeStyle(e.target.value)}
            >
              <option disabled selected></option>
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
          </div>
          <h1 className="font-bold justify-self-center self-center">
            Snippet Editor
          </h1>
          <select
            className="select select-sm justify-self-center self-center select-ghost"
            onChange={(e) => setLang(e.target.value)}
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
        </div>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            hljs.highlight(code, { language: lang.toLowerCase() }).value
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            background: color,
            minHeight: 300,
          }}
        />
        <style>{code_styles_config[codeStyle]}</style>
        {/* <textarea
          className="min-h-[300px] p-2 resize-none border-none"
          style={{ background: color }}
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea> */}
      </div>
    </>
  );
};
