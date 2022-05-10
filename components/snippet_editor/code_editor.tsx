import React from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/common";
//@ts-ignore
import { solidity } from "highlightjs-solidity";
hljs.registerLanguage("solidity", solidity);

interface CodeEditorProps {
  code: string;
  setCode: (arg0: string) => void;
  lang: string;
  fontSize: number;
  color: string;
}

export const CodeEditor = ({
  code,
  setCode,
  lang,
  fontSize,
  color,
}: CodeEditorProps) => {
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
    />
  );
};
