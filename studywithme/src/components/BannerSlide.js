import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled, { css } from "styled-components";

import Image from "../elements/Image";
import banner1 from "../icon/banner1.png";
import banner2 from "../icon/banner2.png";
import banner3 from "../icon/banner3.png";
import banner4 from "../icon/banner4.png";
import banner5 from "../icon/banner5.png";
import banner6 from "../icon/banner6.png";

const BannerSlide = (props) => {
  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: true, // 점보이게 할거니?
    infinite: true,
    speed: 1000,
    slidesToShow: 1, //한번에 몇 장씩 보이게 할거니?
    slidesToScroll: 1, //몇 장씩 넘어갈래?
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    // prevArrow: <Arrow />,

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
        <StyledSlider {...settings}>
          <Image shape="rectangle" paddingTop="40%" src={banner1}></Image>
          <Image shape="rectangle" paddingTop="40%" src={banner6}></Image>
          <Image shape="rectangle" paddingTop="40%" src={banner2}></Image>
          <Image shape="rectangle" paddingTop="40%" src={banner4}></Image>
          <Image shape="rectangle" paddingTop="40%" src={banner3}></Image>
        </StyledSlider>
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

const Wrap = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 30px;
  position: relative;
  max-width: 1134px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    max-width: 768px;
  }
`;

//슬라이더 css부분
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 95%;
    height: 50%;
    margin: 0 auto;
    border-radius: 20px;
  }

  .slick-slide div {
    cursor: pointer;
    /* height: 20%; */
  }

  .slick-dots {
    bottom: 10px;
    margin-top: 1000px;
  }

  .slick-track {
    /* overflow-x: hidden; */
  }
`;

export default BannerSlide;
