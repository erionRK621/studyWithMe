import React, { isValidElement, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import Editor from "../components/Editor";
import { history } from "../redux/configStore";

import Input from "../elements/Input";
import Grid from "../elements/Grid";
import Upload from "../components/Upload";
import SelectBox from "../components/SelectBox";

// Cropper 관련 시작
import Cropper from 'react-easy-crop'
import { getCroppedImg } from "../shared/cropImage";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
// Cropper 관련 끝

// icon
import { ReactComponent as InputFile } from "../icon/inputFile.svg";
import logoImg from "../icon/logo.png";
import logologo from "../icon/logologo.png";

import dotenv from "dotenv";
dotenv.config();

const PostWrite = (props) => {
  const inputFile = useRef();
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    window.alert("로그인을 먼저 해주세요");
    history.push("/login");
  }

  const post = useSelector((state) => state.post.detail);
  const postId = props.match.params.id;
  const _editMode = postId ? true : false;
  const [preview, setPreview] = useState(
    _editMode ? `${process.env.REACT_APP_IMAGE_URI}/${post.imageCover}` : ""
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
  const [imageCover, setImageCover] = useState("");
  const [imageCoverForCrop, setImageCoverForCrop] = useState("");

  // Cropper 관련 시작
  const [rotation, setRotation] = useState(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const inputRef = React.useRef();

  const onSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
    setImageCover(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setImageCoverForCrop(reader.result);
        // console.log(reader.result);
        // console.log("image", image);
      }
    }
  }

  const triggerFileSelectedPopUp = () => {
    // console.log("triggerFileSelectedPopUp 실행");
    inputRef.current.click();
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageCoverForCrop,
        croppedAreaPixels,
        rotation
      )
      // console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
      // 파일 객체로 변환
      urltoFile(croppedImage, 'croppedImage.png', 'image/png')
        .then(
          function (file) {
            // console.log(file);
            setImageCover(file);
          }
        );
    }
    catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation])

  const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }
  // Cropper 관련 끝

  let formData = new FormData();

  // ----- 원래 커버 이미지 추가 모듈 코드 START -----
  // // 커버 이미지 로드
  // const selectFile = (e) => {
  //   //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
  //   const file = e.target.files[0];
  //   // console.log("file", file);
  //   // setImageCover(file);
  //   const reader = new FileReader();

  //   // 미리보기를 위해 file을 읽어온다
  //   if (file && file.type.match("image.*")) {
  //     reader.readAsDataURL(file);
  //   }
  //   else {
  //     setPreview("");
  //   }

  //   //file이 load 된 후
  //   reader.onloadend = () => {
  //     const imagePreview = reader.result;
  //     //base64로 된 이미지를 가져온다(string형태)
  //     setPreview(imagePreview);
  //   };
  // };
  // ----- 원래 커버 이미지 추가 모듈 코드 END -----

  console.log("imageCover", imageCover);

  // 작성버튼 onClick 이벤트
  const posting = () => {
    formData.append("imageCover", imageCover);
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
    formData.append("imageCover", imageCover);
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
      <Navbar>
        <Grid
          is_flex
          justify="start"
          _onClick={() => {
            history.push("/");
          }}
          width="auto"
        >
          <NavbarLogo>
            <img src={logologo} alt="" />
          </NavbarLogo>
          <NavbarLogo>
            <img src={logoImg} alt="" />
          </NavbarLogo>
        </Grid>
        {_editMode ? (
          <Write onClick={editing}>수정</Write>
        ) : (
          <Write onClick={posting}>작성</Write>
        )}
      </Navbar>
      {/* ----- 원래 커버 이미지 추가 모듈 코드 START -----  */}
      {/* <ImageCover src={preview} alt="">
        <UploadButton>
          <InputFile style={{ width: "60px", height: "60px" }} />
          <Upload _onChange={selectFile} display="none" />
        </UploadButton>
      </ImageCover> */}
      {/* ----- 원래 커버 이미지 추가 모듈 코드 END -----  */}
      <Container>
        <CropperContainer>
          {imageCover ?
            <>
              <CropperWrap>
                <Cropper
                  image={imageCoverForCrop}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={2 / 1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </CropperWrap>
              <SliderWrap>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => {
                    setZoom(zoom);
                  }}
                />
              </SliderWrap>
            </>
            : null
          }
        </CropperContainer>
        <ButtonsContainer>
          <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectedPopUp}
            style={{ marginRight: "10px" }}
          >
            이미지 선택
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={showCroppedImage}
          >
            크롭 결과 보기
          </Button>
        </ButtonsContainer>
        {/* <ResultContainer>
          <img
            src={croppedImage}
            alt="croppedImage"
          />
        </ResultContainer> */}
      </Container>
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

const Navbar = styled.div`
  position: sticky;
  top:0;
  display: flex;
  align-items: center; /*반대축(현재는 반대축이 수직축)의 속성값 활용 */
  justify-content: space-between;
  background-color: white;
  padding: 8px 24px 8px 12px;
  z-index: 3;
`;

const NavbarLogo = styled.div`
  font-size: 24px;
  margin: 0 5px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const Write = styled.li`
  padding: 0px 12px;
  width: 84px;
  height: 40px;
  background-color: #ffc85c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  :hover {
    color: black;
    border-radius: 10px;
    cursor: pointer;
  }
`;

// Cropper 관련 시작
const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const CropperContainer = styled.div`
  width: 70%;
  height: 70%;
  margin: auto; 
  // padding: 0px;
`;

const ButtonsContainer = styled.div`
  border: 1px solid #f5f5f5;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CropperWrap = styled.div`
  height: 90%;
	position: relative;
`;

const SliderWrap = styled.div`
  bottom: 100px;
  width: 60%;
  height: 10%;
  display: flex;
  align-items: center;
  margin: auto;
`;

const ResultContainer = styled.div`
  width: 500px;
  margin: 10px auto;
`;
// Cropper 관련 끝

export default PostWrite;
