// Packages
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./utils/cropImage";

// Components
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

function App() {
  const inputRef = React.useRef();

  const [image, setImage] = useState(null); // DataURL 형식
  const [rotation, setRotation] = useState(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null)

  // console.log("image", image);

  const onSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("selectedFile", selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setImage(reader.result);
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
        image,
        croppedAreaPixels,
        rotation
      )
      // console.log('done', { croppedImage })
      setCroppedImage(croppedImage)
      urltoFile(croppedImage, 'croppedImage.png', 'image/png')
        .then(function (file) { console.log(file); });
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  return (
    <Container>
      <CropperContainer>
        {image ?
          <>
            <CropperWrap>
              <Cropper
                image={image}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={16 / 9}
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
      <ResultContainer>
        <img
          src={croppedImage}
          alt="croppedImage"
        />
      </ResultContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const CropperContainer = styled.div`
  height: 90%;
  padding: 10px;
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