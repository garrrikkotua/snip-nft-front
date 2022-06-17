import React from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);
import code_styles_config from "../../styles/code_styles_config.json";
import { useStore, useEditorStore } from "../../hooks/useStore";

interface CodeEditorProps {
  lang: string;
  fontSize: number;
  color: string;
  windowStyle: boolean;
  windowColor: string;
  codeStyle: string;
}

const JustTheEditor = ({ fontSize, color, lang }: any) => {
  const [code, setCode] = useStore((state) => [state.code, state.setCode]);
  return (
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
  );
};

export const CodeEditor = () => {
  const [lang, fontSize, color, windowStyle, windowColor, codeStyle] =
    useEditorStore((state) => [
      state.lang,
      state.fontSize,
      state.color,
      state.windowStyle,
      state.windowColor,
      state.codeStyle,
    ]);
  return (
    <>
      <div
        id="editor-area"
        className={windowStyle ? "mockup-window border" : ""}
        style={{ background: windowColor }}
      >
        <JustTheEditor fontSize={fontSize} lang={lang} color={color} />
      </div>
      <style>{code_styles_config[codeStyle]}</style>
    </>
  );
};
