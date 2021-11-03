import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import Editor from "../components/Editor";

// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";
import Input from "../elements/Input";
import Upload from "../components/Upload";
import SelectBox from "../components/SelectBox";
const PostWrite = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [spaceVal, setSpaceVal] = useState("home");
  const [studyMateVal, setStudyMateVal] = useState("solo");
  const [interestVal, setInterestVal] = useState("dev");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  let formData = new FormData();

  // 커버 이미지 로드
  const selectFile = (e) => {
    //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
    const request = { imageCover: e.target.files[0] };
    const file = e.target.files[0];
    setImage(file);

    //multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
    for (let entry of Object.entries(request)) {
      formData.append(entry[0], entry[1]);
    }
    const reader = new FileReader();

    // 미리보기를 위해 file을 읽어온다
    reader.readAsDataURL(file);

    //file이 load 된 후
    reader.onloadend = () => {
      const imagePreview = reader.result;
      //base64로 된 이미지를 가져온다(string형태)
      setPreview(imagePreview);
    };
  };

  // 작성버튼 onClick 이벤트
  const posting = () => {
    formData.append("imageCover", image);
    formData.append("title", title);
    formData.append("categorySpace", spaceVal);
    formData.append("categoryStudyMate", studyMateVal);
    formData.append("categoryInterest", interestVal);
    formData.append("contentsEditor", content);

    dispatch(postActions.addPostDB(formData));
  };

  const getContent = (content) => {
    setContent(content);
  };

  const space = (e) => {
    setSpaceVal(e.target.value);
  };
  const studyMate = (e) => {
    setStudyMateVal(e.target.value);
  };
  const interest = (e) => {
    setInterestVal(e.target.value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <ImageCover src={preview} alt="" />
      <Upload _onChange={selectFile} />
      <FlexGrid direction="column" justify="space-evenly">
        <Input
          _onChange={titleChange}
          value={title}
          borderBottom
          border="0px"
          placeholder="제목을 입력해주세요"
          size="20px"
        />
        <FlexGrid margin="20px 0px">
          <SelectBox category="space" _onChange={space} _value={spaceVal} />
          <SelectBox
            category="studyMate"
            _onChange={studyMate}
            _value={studyMateVal}
          />
          <SelectBox
            category="interest"
            _onChange={interest}
            _value={interestVal}
          />
        </FlexGrid>
        <Editor getContent={getContent} />
        <button onClick={posting}>작성</button>
      </FlexGrid>
    </>
  );
};
const FlexGrid = styled.div`
  display: flex;
  max-width: 750px;
  margin: ${(props) => (props.margin ? props.margin : "auto")};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
`;

const ImageCover = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(100vh - 350px);
  background-color: #eeeeee;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;
export default PostWrite;
