import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import banner from "../icon/bannerImg.png";
import kkiriText from "../icon/text1.png";
import kkiriText2 from "../icon/text2.png";

import Image from "../elements/Image";
import RandomSlide from "../components/RandomSlide";
import LikeSlide from "../components/LikeSlide";
import FollowSlide from "../components/FollowSlide";

const Main = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Banner>
          <Image shape="rectangle" src={banner} paddingTop="40%"></Image>
          <ImgContents>
            <img src={kkiriText} />
          </ImgContents>
          <ImgContents2>
            <img src={kkiriText2} />
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

const BackGroundDiv = styled.div`
  background-image: url(banner);
`;

const Banner = styled.div`
  position: relative;
`;
const ImgContents = styled.div`
  position: absolute;
  bottom: 30%;
  left: 10%;
  z-index: 2;
`;
const ImgContents2 = styled.div`
  position: absolute;
  bottom: 20%;
  left: 10%;
  z-index: 2;
`;

export default Main;
