import React, { useState } from "react";
import Editor from "../components/Editor";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
const PostWrite = () => {
  const [post, setPost] = useState("");
  const posting = () => {};
  const getContent = (content) => {
    setPost(ReactHtmlParser(content));
  };
  return (
    <div>
      <div style={{height:"100px"}}></div>
      <Editor getContent={getContent} />
      <button onClick={posting}>작성</button>
      {post}
    </div>
  );
};

export default PostWrite;
