import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import banner from "../icon/bannerImg.png";
import kkiri from "../icon/kkiri.png";
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
          <Image shape="rectangle" src={banner} paddingTop="40%">
            <ImgContents>
              <Image shape="rectangle" src={kkiri} paddingTop="40%" />
            </ImgContents>
          </Image>
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
  z-index: 2;
`;

export default Main;
