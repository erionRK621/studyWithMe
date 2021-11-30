import React, {
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import Editor from "../components/Editor";
import { history } from "../redux/configStore";

import Input from "../elements/Input";
import Grid from "../elements/Grid";
import SelectBox from "../components/SelectBox";

// Cropper 관련
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../shared/cropImage";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

// icon
import logoImg from "../icon/logo.png";
import logologo from "../icon/logologo.png";

import dotenv from "dotenv";
dotenv.config();

const PostWrite = (props) => {
  const dispatch = useDispatch();

  if (!localStorage.getItem("user")) {
    window.alert("로그인을 먼저 해주세요");
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

  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const inputRef = React.useRef();

  const onSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    setCoverOriginal(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setImageCoverForCrop(reader.result);
      };
    }
  };

  const triggerFileSelectedPopUp = () => {
    inputRef.current.click();
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

  const confirmCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageCoverForCrop,
        croppedAreaPixels,
        rotation
      );
      // console.log("done", { croppedImage });
      // base64 형식의 Cropped Image 상태 저장
      setCroppedImage(croppedImage);
      // 파일 객체로 변환
      urltoFile(croppedImage, "croppedImage.png", "image/png").then(function (
        file
      ) {
        setCoverCropped(file);
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    confirmCroppedImage();
    console.log("onCropComplete 실행");
  };

  let formData = new FormData();

  // 작성버튼 onClick 이벤트
  const posting = () => {
    if (spaceVal === "" || interestVal === "") {
      window.alert("카테고리를 지정해주세요");
      return;
    }

    if (title.length >= 25) {
      window.alert("제목이 24자가 넘습니다.");
      return;
    }

    // 만약 사용자가 크롭하지 않을 경우? 원본 커버 이미지 사용
    if (coverCropped === null) {
      console.log("coverCropped 없음");
      console.log("coverCropped 변경 전", coverCropped, typeof (coverCropped));
      // setCoverCropped(coverOriginal);
      setCoverCropped(coverOriginal);
      console.log("coverCropped 변경 후", coverCropped, typeof (coverCropped));
    }

    formData.append("coverOriginal", coverOriginal);
    formData.append("coverCropped", coverCropped);
    formData.append("title", title);
    formData.append("categorySpace", spaceVal);
    formData.append("categoryInterest", interestVal);
    formData.append("contentEditor", content);

    console.log("coverOriginal", coverOriginal);
    console.log("coverCropped", coverCropped);
    console.log("title", title);
    console.log("categorySpace", spaceVal);
    console.log("categoryInterest", interestVal);
    console.log("contentEditor", content);

    dispatch(postActions.addPostDB(formData));
  };



  const editing = () => {
    if (title.length >= 25) {
      window.alert("제목이 24자가 넘습니다.");
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
          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectedPopUp}
            style={{ marginRight: "10px" }}
          >
            이미지 선택
          </Button>
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
  height: 70vh;
  width: 70vw;
  margin: auto;
`;

const CropperContainerInner = styled.div`
  width: 70%;
  height: 70%;
  margin: auto;
  background-color: gray;
`;

const ButtonsContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default PostWrite;
