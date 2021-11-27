import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

// import banner from "../icon/bannerImg.png";
import banner from "../icon/bannerNone.jpg";
import kkiriText from "../icon/text1.png";
import kkiriText2 from "../icon/text2.png";

import Image from "../elements/Image";
import RandomSlide from "../components/RandomSlide";
import LikeSlide from "../components/LikeSlide";
import FollowSlide from "../components/FollowSlide";

const Main = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getPostDB());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Wrap>
        <Banner>
          <Image shape="rectangle" src={banner} paddingTop="40%"></Image>
          <ImgContents>
            <img src={kkiriText} style={{ maxWidth: "100%" }} alt=""/>
          </ImgContents>
          <ImgContents2>
            <img src={kkiriText2} style={{ maxWidth: "100%" }} alt=""/>
          </ImgContents2>
        </Banner>

        <div>
          <LikeSlide></LikeSlide>
        </div>
        <div>
          <RandomSlide></RandomSlide>
        </div>
        <div>
          <FollowSlide></FollowSlide>
        </div>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

const Banner = styled.div`
  position: relative;
`;
const ImgContents = styled.div`
  position: absolute;
  bottom: 30%;
  left: 45%;
  z-index: 2;
  @media screen and (max-width: 768px) {
    width: 80px;
    left: 50%;
  }
`;
const ImgContents2 = styled.div`
  position: absolute;
  bottom: 20%;
  left: 45%;
  z-index: 2;
  @media screen and (max-width: 768px) {
    width: 80px;
    left: 50%;
  }
`;

export default Main;
