import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postCreators } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Slide from "../components/Slide";
import Post from "../components/Post";

const Main = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  useEffect(() => {
    dispatch(postCreators.getPostDB());
  }, []);

  return (
    <React.Fragment>
      <div>
        <Slide></Slide>
      </div>

      <Grid>
        <GridWrap>
          {post_list.map((p, idx) => {
            return (
              <Grid key={idx}>
                <Post key={idx} {...p} />
              </Grid>
            );
          })}
        </GridWrap>
      </Grid>
    </React.Fragment>
  );
};

const GridWrap = styled.div`
  max-width: 1300px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 40px;
`;

export default Main;
