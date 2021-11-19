import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";

import bgImg from "../icon/Component.png";
import { style } from "@material-ui/system";

const NothingSlide = (props) => {
  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: false, // 점보이게 할거니?
    speed: 500,
    slidesToShow: 1, //한번에 몇 장씩 보이게 할거니?
    slidesToScroll: 1, //몇 장씩 넘어갈래?
    centerMode: true,
    centerPadding: "0px",
    arrows: false,

    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, // 화면 사이즈 1200px
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Wrap>
        <ImageWrap
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <InnerDiv>
            <div>아직 팔로우한 유저가 없어요!</div>
            <div>나와 비슷한 관심사를 가지고 공부하는 유저들을 만나봐요!</div>
          </InnerDiv>
        </ImageWrap>
      </Wrap>
    </React.Fragment>
  );
};

const defaultButtonStyle = css`
  position: absolute;
  top: 40%;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background: none;
  outline: none;
  cursor: pointer;
`;

const defaultIconStyle = css`
  font-size: 22px;
  color: black;

  &:focus,
  &:hover {
    color: #666;
  }
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: end;
`;

const InnerDiv = styled.div`
  margin: auto 24px auto auto;
  font-size: 18px;
  color: #282828;
`;

const Wrap = styled.div`
  width: 75vw;
  height: 30vh;
  max-height: 263px;
  margin: auto;
  position: relative;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

//슬라이더 css부분
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    height: 50%;
    margin: 0 auto;
  }
`;

export default NothingSlide;
