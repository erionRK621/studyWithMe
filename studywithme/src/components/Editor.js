import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../shared/cookie";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import ListStyle from "@ckeditor/ckeditor5-list/src/list";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Undo from "@ckeditor/ckeditor5-undo/src/undo";

// Insert table 플러그인 추가
// Undo 플러그인 추가
// Redo 플러그인 추가
// 단어 카운트 플러그인 추가
// AutoImage 플러그인 추가

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";

import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import AutoImage from "@ckeditor/ckeditor5-image/src/autoimage";
// import Swal from "sweetalert2";

import styled from "styled-components";
import dotenv from "dotenv";
dotenv.config();


class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      // file은 파일객체이다.
      (file) =>
        new Promise((resolve, reject) => {
          //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
          const req = { temp: file };

          //multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
          let formData = new FormData();
          for (let entry of Object.entries(req)) {
            formData.append(entry[0], entry[1]);
          }

          //통신헤더설정
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem("user")}`,
            },
          };
          
          async function sendImg() {
            //서버에 파일 객체를 보내서 imgUrl을 얻어온다.
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_API_URI}/api/posts/ckUpload`,
                formData,
                config
              );
              console.log(response);
              if (response.statusText === "Created") {
                const downloadURL = `${process.env.REACT_APP_API_URI}/${response.data.path}`;
                resolve({
                  default: downloadURL,
                });
              }
            } catch (err) {
              console.log(err);
              //         Swal.fire(
              //             "에러",
              //             "이미지를 등록할 수 없습니다. 다시 시도해주세요!",
              //             "error",
              // );
            }
          }
          sendImg();
        })
    );
  }
}

const editorConfiguration = {
  plugins: [
    Bold,
    Italic,
    Essentials,
    Heading,
    Paragraph,
    Font,
    FontColor,
    FontBackgroundColor,
    Image,
    ImageUpload,
    ImageResize,
    AutoImage,
    Link,
    MediaEmbed,
    Alignment,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResizeEditing,
    ImageResizeHandles,
    ListStyle,
    Autoformat,
    TodoList,
    Indent,
    IndentBlock,
    BlockQuote,
    Table,
    TableToolbar,
    Undo,
  ],
  toolbar: [
    "heading",
    "|",
    "fontSize",
    "FontColor",
    "FontBackgroundColor",
    "|",
    "bold",
    "italic",
    "|",
    "bulletedList",
    "numberedList",
    "todoList",
    "blockQuote",
    "insertTable",
    "|",
    "alignment",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "MediaEmbed",
    "Link",
    "|",
    "undo",
    "redo",
  ],

  image: {
    resizeUnit: "%",
    toolbar: [
      "imageTextAlternative",
      "|",
      "imageStyle:full",
      "imageStyle:side",
      "imageStyle:alignCenter",
      "imageStyle:alignLeft",
      "imageStyle:alignRight",
      "resizeImage",
    ],
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        icon: "original",
      },
      {
        name: "resizeImage:50",
        value: "50",
        icon: "medium",
      },
      {
        name: "resizeImage:75",
        value: "75",
        icon: "large",
      },
    ],
    styles: ["full", "alignLeft", "alignRight", "side", "alignCenter"],
  },
  table: {
    defaultHeadings: { rows: 1, columns: 1 },
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },

  mediaEmbed: {
    previewsInData: true,
  },
  heading: {
    options: [
      {
        model: "paragraph",
        view: "p",
        title: "본문",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "헤더1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "헤더2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "헤더3",
        class: "ck-heading_heading3",
      },
    ],
  },
  fontSize: {
    options: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
};
const Editor = ({ getContent, value }) => {
  const [data, setData] = useState(value);
  const handleChange = (event, editor) => {
    setData(editor.getData());
  };
  return (
    <div className="ck-content">
      <StyledEditor height="500px">
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={editorConfiguration}
          onChange={(event, editor) => {
            handleChange(event, editor);
            getContent(editor.getData());
          }}
          onReady={(editor) => {
            if (editor?.plugins) {
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return new MyUploadAdapter(loader);
              };
            }
          }}
        />
      </StyledEditor>
    </div>
  );
};

Editor.defaultProps = {
  getContent: () => {},
};

const StyledEditor = styled.div`
  .ck-content {
    ${(props) => props.height && `min-height:${props.height}`}
  }
`;

export default Editor;
