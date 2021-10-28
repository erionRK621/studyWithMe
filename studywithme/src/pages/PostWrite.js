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
    // setPost(content);
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



//<p><img></p>

//<figure class="image"><img src="https://i.ytimg.com/vi/Fb2IbIYGHd8/maxresdefault.jpg" alt="지방이 - 나무위키"></figure>