import React from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);
import code_styles_config from "../../styles/code_styles_config.json";
import { useStore } from "../../hooks/useStore";

interface CodeEditorProps {
  lang: string;
  fontSize: number;
  color: string;
  windowStyle: boolean;
  windowColor: string;
  codeStyle: string;
}

export const CodeEditor = ({
  lang,
  fontSize,
  color,
  windowStyle,
  windowColor,
  codeStyle,
}: CodeEditorProps) => {
  const [code, setCode] = useStore((state) => [state.code, state.setCode]);

  return (
    <>
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
    </>
  );
};
