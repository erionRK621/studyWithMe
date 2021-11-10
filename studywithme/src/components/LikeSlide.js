import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configStore";
import SlideContent from "./SliderContent";
import CardMain from "./CardMain";

const LikeSlide = (props) => {
  const post_list = useSelector((state) => state.post.list);
  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: false, // 점보이게 할거니?
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 3, //한번에 몇 장씩 보이게 할거니?
    slidesToScroll: 1, //몇 장씩 넘어갈래?
    centerMode: true,
    centerPadding: "0px",
    arrows: true,

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
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Wrap>
        <SlideUpLine>
          <SlideTitle>인기게시글</SlideTitle>
          <More
            onClick={() => {
              history.push("/list");
            }}
          >
            더보기
          </More>
        </SlideUpLine>

        <StyledSlider {...settings}>
          {post_list.map((p, idx) => {
            return (
              <PostWrap key={idx}>
                <CardMain
                  key={idx}
                  {...p}
                  onClick={() => {
                    history.push(`/detail/${p.postId}`);
                  }}
                />
              </PostWrap>
            );
          })}
        </StyledSlider>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 30%;
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

const SlideUpLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5%;
`;

const SlideTitle = styled.div`
  font-size: 20px;
`;

const More = styled.div`
  font-size: 13px;
  opacity: 50%;
`;

const PostWrap = styled.div`
  width: 100px;
  height: 100px;
`;

//슬라이더 css부분
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    height: 50%;
    margin: 0 auto;
  }

  .slick-slide div {
    /* cursor: pointer; */
    /* height: 20%; */
  }

  .slick-dots {
    bottom: -10px;
    margin-top: 1000px;
  }

  .slick-track {
    /* overflow-x: hidden; */
  }

  .slick-arrow {
    z-index: 10;
    width: 50px;
    height: 50px;
    background: rgba($bk, 0.2);
    border-radius: 50%;
    transition: background 0.5s;

    &:hover {
      background: rgba($pt, 0.9);
    }
    &::before {
      font-weight: 900;
      font-size: 49px;
      transition: all 0.5s;
    }
  }

  .slick-prev {
    top: 40%;
    left: 30px;
  }

  .slick-next {
    top: 40%;
    right: 30px;
  }
`;

export default LikeSlide;
