// ! Reference : https://react-text-editor-git-main-weianofsteel.vercel.app/
// ! Reference : https://github.dev/weianofsteel/react-text-editor
/*
    import ReactHtmlParser from 'react-html-parser';
    <div>{ReactHtmlParser(html_string)}</div>
*/
import React, { useEffect, useState } from "react";
import {
  convertToRaw, EditorState, ContentState, convertFromHTML,
} from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

function WYSIWYGEditor({
  onChange, onFocus, onBlur, value, ...rest
}) {
  const [valueLoaded, setValueLoaded] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!valueLoaded) {
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(value || ""))));
    }
    if (value) {
      setValueLoaded(true);
    }
  }, [value]);

  // const [message, setMessage] = useState(value)
  const [rawMessage, setRawMessage] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleEditorStateToMessage = (e) => {
    // setMessage(rawMessage)
    e.target = {};
    e.target.value = rawMessage;
    onChange(e);
  };

  return (
    <>
      {/* <div dangerouslySetInnerHTML={{__html: message}} /> */}
      <Editor
        initialEditorState={editorState}
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        onChange={(e) => {
          handleEditorStateToMessage(e);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
}

function CustomEditor(props) {
  return <WYSIWYGEditor {...props} />;
}

export default CustomEditor;
