import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import SlideContent from "./SliderContent";

const Slide = () => {
  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: true, // 점은 안 보이게
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 1, //장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요

    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, // 화면 사이즈 1200px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
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

  //SlideContent를 따로 빼지말고 직접적으로 내용 채워주면 될 듯
  return (
    <Wrap>
      <Slider {...settings}>
        <div>
          <SlideContent>1</SlideContent>
        </div>
        <div>
          <SlideContent>2</SlideContent>
        </div>
        <div>
          <SlideContent>3</SlideContent>
        </div>
        <div>
          <SlideContent>4</SlideContent>
        </div>
        <div>
          <SlideContent>5</SlideContent>
        </div>
        <div>
          <SlideContent>6</SlideContent>
        </div>
      </Slider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 600px;
  height: 600px;
`;

export default Slide;
