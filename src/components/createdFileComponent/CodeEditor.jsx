import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

const codes = {
  html: "xml",
  php: "php",
  js: "javascript",
  jsx: "jsx",
  txt: "textile",
  xml: "xml",
  css: "css",
  c: "clike",
  cpp: "clike",
  java: "java",
  cs: "clike",
  py: "python",
  json: "javascript",
};

export default function CodeEditor({ data, setData, fileName, extension }) {
  
  function handleEditorChange(value, event) {
    setData(value)
  }

  return (
    <>
      <Editor
        height="400px"
        //defaultLanguage="javascript"
        language={codes[extension]}
        //defaultValue="// some comment"
        value={data}
        //onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </>
  );
}