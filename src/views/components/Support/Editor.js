import { useIntl } from "react-intl";
import React, { useRef } from "react";
import JoditEditor from "jodit-react";

function Editor({ setValue, value }) {
  const editor = useRef(null);
  const context = useIntl();
  // Editor config
  const config = {
    readonly: false,
    height: 200,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    placeholder:
      context.locale === "en" ? "Please write a comment" : "الرجاء كتابة تعليق",
    defaultActionOnPaste: "insert_clear_html",
  };
  return (
    // useMemo(
    //   () => (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(content) => {
        setValue(content);
      }}
    />
    // ),
    // []
  );
}

export default Editor;
