import React, { isValidElement, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import Editor from "../components/Editor";
import { history } from "../redux/configStore";

import Input from "../elements/Input";
import Upload from "../components/Upload";
import SelectBox from "../components/SelectBox";

// icon
import { ReactComponent as InputFile } from "../icon/inputFile.svg";

import dotenv from "dotenv";
dotenv.config();

const PostWrite = (props) => {
  const inputFile = useRef();
  if (!localStorage.getItem("user")) {
    window.alert("로그인을 먼저 해주세요");
    history.push("/login");
  }

  const post = useSelector((state) => state.post.detail);
  const postId = props.match.params.id;
  const _editMode = postId ? true : false;
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(
    _editMode ? `${process.env.REACT_APP_API_URI}/${post.imageCover}` : ""
  );
  const [content, setContent] = useState(
    _editMode ? decodeURIComponent(post.contentEditor) : ""
  );
  const [spaceVal, setSpaceVal] = useState(_editMode ? post.categorySpace : "");
  const [studyMateVal, setStudyMateVal] = useState(
    _editMode ? post.categoryStudyMate : ""
  );
  const [interestVal, setInterestVal] = useState(
    _editMode ? post.categoryInterest : ""
  );
  const [title, setTitle] = useState(
    _editMode ? decodeURIComponent(post.title) : ""
  );
  const [image, setImage] = useState("");

  let formData = new FormData();

  // 커버 이미지 로드
  const selectFile = (e) => {
    //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
    const request = { imageCover: e.target.files[0] };
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();

    // 미리보기를 위해 file을 읽어온다
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }

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
    formData.append("contentEditor", content);

    // for(var a of formData.entries()) {
    //   console.log(a);
    // }
    if (spaceVal === "" || studyMateVal === "" || interestVal === "") {
      window.alert("카테고리를 지정해주세요");
      return;
    }
    dispatch(postActions.addPostDB(formData));
  };

  const editing = () => {
    formData.append("imageCover", image);
    formData.append("title", title);
    formData.append("categorySpace", spaceVal);
    formData.append("categoryStudyMate", studyMateVal);
    formData.append("categoryInterest", interestVal);
    formData.append("contentEditor", content);

    dispatch(postActions.editPostMiddleware(postId, formData));
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
      <ImageCover src={preview} alt="">
        <UploadButton>
          <InputFile style={{ width: "60px", height: "60px" }} />
          <Upload _onChange={selectFile} display="none" />
        </UploadButton>
      </ImageCover>
      <FlexGrid direction="column" justify="space-evenly">
        <Input
          _onChange={titleChange}
          value={title}
          border="0px"
          placeholder="제목"
          size="20px"
          margin="30px 0px 0px 0px"
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
        <Editor value={content} getContent={getContent} />
        {_editMode ? (
          <button onClick={editing}>수정</button>
        ) : (
          <button onClick={posting}>작성</button>
        )}
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
const UploadButton = styled.label`
  position: absolute;
  left: calc(50% - 30px);
  top: calc(50% - 30px);
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
export default PostWrite;
