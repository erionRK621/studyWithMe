import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import SlideContent from "./SliderContent";
import Post from "./Post";

const Slide = (props) => {
  const post_list = useSelector((state) => state.post.list);
  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: true, // 점은 안 보이게
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 3, //1장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
    centerMode: true,
    centerPadding: "0px",

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
          slidesToShow: 2,
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
        {post_list.map((p, idx) => {
          return (
            <PostWrap key={idx}>
              <Post key={idx} {...p} />
            </PostWrap>
          );
        })}
      </Slider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 600px;
`;

const PostWrap = styled.div`
  width: 100px;
  height: 100px;
`;
export default Slide;
