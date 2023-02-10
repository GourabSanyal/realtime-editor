import React, { useEffect } from "react";
import { EditorView, basicSetup } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  useEffect(() => {
    async function init() {
      // EditorView.fromTextArea(document.getElementById("realtimeEditor"), {
      //   mode: { name: "javascript", JSON: true },
      // });
      <CodeMirror
        value="console.log('hello world!');"
        height="100vh"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        // onChange={onChange}
      />;
    }
    init();
  }, []);

  return (
    <div>
      <CodeMirror
        value="console.log('hello world!');"
        theme="dark"
        extensions={[javascript({ jsx: true }, { JSON: true })]}
        // onChange={onChange}
      />
      ;
    </div>
  );
};

export default Editor;
