import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import Editor from "../components/Editor";
import { history } from "../redux/configStore";
import Swal from "sweetalert2";
import heic2any from "heic2any";

import Input from "../elements/Input";
import Grid from "../elements/Grid";
import SelectBox from "../components/SelectBox";

// Cropper 관련
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../shared/cropImage";
import Slider from "@material-ui/core/Slider";

// icon
import logoImg from "../icon/logo.png";
import logologo from "../icon/logologo.png";
import { ReactComponent as InputFile } from "../icon/inputFile.svg";

import dotenv from "dotenv";
dotenv.config();

const PostWrite = (props) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    Swal.fire("로그인을 먼저 해주세요", "", "error");
    history.push("/login");
  }

  const post = useSelector((state) => state.post.detail);
  const coverOriginalForEdit = post?.coverOriginal;
  const postId = props.match.params.id;
  const _editMode = postId ? true : false;

  const [content, setContent] = useState(
    _editMode ? decodeURIComponent(post.contentEditor) : ""
  );
  const [spaceVal, setSpaceVal] = useState(_editMode ? post.categorySpace : "");

  const [interestVal, setInterestVal] = useState(
    _editMode ? post.categoryInterest : ""
  );
  const [title, setTitle] = useState(
    _editMode ? decodeURIComponent(post.title) : ""
  );
  const [coverOriginal, setCoverOriginal] = useState(null);
  const [coverCropped, setCoverCropped] = useState(null);
  const [imageCoverForCrop, setImageCoverForCrop] = useState(
    _editMode
      ? `${process.env.REACT_APP_IMAGE_URI}/${coverOriginalForEdit}`
      : null
  );
  const rotation = 0;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const inputRef = React.useRef();

  const onSelectFile = (e) => {
    const reader = new FileReader();
    let selectedFile = e.target.files[0];
    setCoverOriginal(selectedFile);

    // heic 파일일 경우
    if (selectedFile && selectedFile.name.split(".")[1] === "heic") {
      let HEICcoverOriginalBlob = selectedFile;

      // blob에다가 변환 시키고 싶은 file값을 value로 놓는다.
      // toType에다가는 heic를 변환시키고싶은 이미지 타입을 넣는다.
      heic2any({ blob: HEICcoverOriginalBlob, toType: "image/jpeg" })
        .then(function (resultBlob) {
          // file에 새로운 파일 데이터 덮어쓰기
          selectedFile = new File(
            [resultBlob],
            selectedFile.name.split(".")[0] + ".jpg",
            { type: "image/jpeg", lastModified: new Date().getTime() }
          );
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            setImageCoverForCrop(reader.result);

            urltoFile(reader.result, "coverOriginal.png", "image/png").then(
              function (file) {
                setCoverOriginal(file);
              }
            );
          };
        })
        .catch(function (x) {
          console.log(x);
        });
    }

    // heic 파일이 아닌 경우
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setImageCoverForCrop(reader.result);
      };
    }
  };

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const confirmCroppedImage = useCallback(
    async (croppedAreaPixels) => {
      try {
        const croppedImage = await getCroppedImg(
          imageCoverForCrop,
          croppedAreaPixels,
          rotation
        );
        // base64 형식의 Cropped Image 상태 저장
        // setCroppedImage(croppedImage);
        // 파일 객체로 변환
        urltoFile(croppedImage, "croppedImage.png", "image/png").then(function (
          file
        ) {
          setCoverCropped(file);
        });
      } catch (e) {
        console.log(e);
      }
    },
    [rotation, imageCoverForCrop]
  );

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    confirmCroppedImage(croppedAreaPixels);
  };

  let formData = new FormData();

  // 작성버튼 onClick 이벤트
  const posting = () => {
    if (spaceVal === "" || interestVal === "") {
      Swal.fire("카테고리를 지정해주세요", "", "error");
      return;
    }

    if (title.length >= 25) {
      Swal.fire("제목이 24자가 넘습니다.", "", "error");
      return;
    }

    // 만약 사용자가 크롭하지 않을 경우? 원본 커버 이미지 사용
    if (coverCropped === null) {
      setCoverCropped(coverOriginal);
    }

    formData.append("coverOriginal", coverOriginal);
    formData.append("coverCropped", coverCropped);
    formData.append("title", title);
    formData.append("categorySpace", spaceVal);
    formData.append("categoryInterest", interestVal);
    formData.append("contentEditor", content);

    dispatch(postActions.addPostDB(formData));
  };

  const editing = () => {
    if (title.length >= 25) {
      Swal.fire("제목이 24자가 넘습니다.", "", "error");
      return;
    }
    formData.append("coverOriginal", coverOriginal);
    formData.append("coverCropped", coverCropped);
    formData.append("title", title);
    formData.append("categorySpace", spaceVal);
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
      <FlexGrid
        style={{
          fontSize: "20px",
          marginBottom: "10px"
        }}
      >
        커버 이미지
      </FlexGrid>
      <CropperContainerOuter>
        <CropperContainerInner>
          {imageCoverForCrop ? (
            <>
              <CropperWrap>
                <Cropper
                  image={imageCoverForCrop}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={772 / 433}
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
          ) : null}
        </CropperContainerInner>
        <ButtonsContainer>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <InputFile className="iconButton">
            이미지 선택
          </InputFile>
        </ButtonsContainer>
      </CropperContainerOuter>
      <FlexGrid direction="column" justify="space-evenly">
        <Input
          _onChange={titleChange}
          value={title}
          border="0px"
          placeholder="제목"
          size="20px"
          margin="0px 0px 0px 0px"
        />
        <FlexGrid margin="20px 0px">
          <SelectBox category="space" _onChange={space} _value={spaceVal} />
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

const Navbar = styled.div`
  position: sticky;
  padding: 10px 40px;
  max-width: 1134px;
  margin: auto;
  top: 0;
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

// Cropper 관련
const CropperContainerOuter = styled.div`
  height: 50vh;
  max-width: 750px;
  margin: auto;
`;

const CropperContainerInner = styled.div`
  width: 100%;
  max-width: 750px;
  height: 50%;
  margin: auto;
  background-color: gray;
  position: absolute;
`;

const ButtonsContainer = styled.label`
  width:auto;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  position: relative;
  top: 88%;
  left: 90%;
`;

const CropperWrap = styled.div`
  width: 100%;
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

const CoverImageLabel = styled.div`
  margin: auto;  
  margin-bottom: 10px;
`;


export default PostWrite;
