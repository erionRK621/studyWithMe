import React, { useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

import { history } from "../redux/configStore";
import CardMain from "./CardMain";
import NothingSlide from "./NothingSlide";
import { ReactComponent as Star } from "../icon/star2.svg";

const FollowSlide = (props) => {
  const post_list = useSelector((state) => state.post.list?.followPost);

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  const slickRef = useRef(null);

  //settings 부분, 슬라이더의 기능을 조정할 수 있다.
  const settings = {
    dots: false, // 점보이게 할거니?
    infinite: post_list?.length <= 2 ? false : true,
    speed: 500,
    slidesToShow: 3, //한번에 몇 장씩 보이게 할거니?
    slidesToScroll: 1, //몇 장씩 넘어갈래?
    centerMode: true,
    centerPadding: "0px",
    arrows: false,

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

  return (
    <React.Fragment>
      <Wrap>
        <SlideUpLine>
          <Star />
          내 친구들의 데스크테리어
          <Star />
        </SlideUpLine>
        {post_list?.length === 0 ? null : (
          <More
            onClick={() => {
              history.push("/list");
              window.scrollTo(0, 0);
            }}
          >
            더보기
          </More>
        )}
        {post_list?.length === 0 ? (
          <NothingSlide></NothingSlide>
        ) : (
          <StyledSlider ref={slickRef} {...settings}>
            {post_list?.map((p, idx) => {
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
        )}
        {post_list?.length === 0 ? null : (
          <>
            <PrevButton onClick={previous}>
              <PrevIcon />
              <span className="hidden"></span>
            </PrevButton>

            <NextButton onClick={next}>
              <NextIcon />
              <span className="hidden"></span>
            </NextButton>
          </>
        )}
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
const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: 0;
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 0;
`;

const defaultIconStyle = css`
  font-size: 22px;
  color: black;

  &:focus,
  &:hover {
    color: #666;
  }
`;

const PrevIcon = styled(IoIosArrowBack)`
  ${defaultIconStyle}
`;

const NextIcon = styled(IoIosArrowForward)`
  ${defaultIconStyle}
`;

const Wrap = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 40px;
  position: relative;
  max-width: 1134px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    max-width: 768px;
  }
`;

const SlideUpLine = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 5%;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const More = styled.div`
  display: flex;
  justify-content: end;
  margin: 5px 5%;
  font-size: 13px;
  opacity: 50%;
  &:hover {
    cursor: pointer;
  }
`;
const Nothing = styled.div`
  width: 769px;
  height: 263px;
  background-color: #9dd0d1;
  display: flex;
  justify-content: center;
  align-items: center;
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

  /* .slick-arrow {
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
      font-size: 20px;
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
  } */
`;

export default FollowSlide;
