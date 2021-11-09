import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Image from "../elements/Image";
import RandomSlide from "../components/RandomSlide";
import CardMain from "../components/CardMain";
import LikeSlide from "../components/LikeSlide";
import FollowSlide from "../components/FollowSlide";

const Main = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const post_list = useSelector((state) => state.post.list);
  const user = useSelector((state) => state.user.user);
  // console.log(post_list);
  console.log("user", user);

  useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Image
          shape="rectangle"
          // src={}
          paddingTop="40%"
        >
          메인배너
        </Image>
        <div>
          <LikeSlide></LikeSlide>
        </div>
        <div>
          <RandomSlide></RandomSlide>
        </div>
        <div>
          <FollowSlide></FollowSlide>
        </div>

        {/* <Grid>
          <GridWrap>
            {post_list.map((p, idx) => {
              return (
                <Grid key={p.postId}>
                  <CardMain
                    {...p}
                    onClick={() => {
                      history.push(`/detail/${p.postId}`);
                    }}
                  />
                </Grid>
              );
            })}
          </GridWrap>
        </Grid> */}
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

// const GridWrap = styled.div`
//   max-width: 1300px;
//   margin: auto;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//   grid-gap: 40px;
// `;

export default Main;
