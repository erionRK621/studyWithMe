import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";

import bigImg from "../icon/banner5.png";
import smallImg from "../icon/none.png";

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
        <ImageWrap bigImg={bigImg} smallImg={smallImg}>
          <InnerDiv>
            <div>아직 팔로우한 유저가 없어요!</div>
            <div>나와 비슷한 관심사를 가지고 </div>
            <div>공부하는 유저들을 만나봐요!</div>
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
  border-radius: 10px;
  display: flex;
  justify-content: end;
  background-image: url("${(props) => props.bigImg}");
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 768px) {
    background-image: url("${(props) => props.smallImg}");
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const InnerDiv = styled.div`
  margin: auto auto auto 64px;
  font-size: 18px;
  color: #282828;
  @media screen and (max-width: 768px) {
    font-size: 9px;
    margin: auto auto auto 24px;
  }
`;

const Wrap = styled.div`
  width: 75vw;
  max-width: 1070px;
  height: 30vh;
  max-height: 263px;
  margin: auto;
  margin-top: 10px;
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
