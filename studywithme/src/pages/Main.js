import React, { useEffect } from "react";
import styled from "styled-components";
// import { useSelector, useDispatch } from "react-redux";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Slide from "../components/Slide";

const Main = () => {
  //   const dispatch = useDispatch();
  //   const { history } = props;

  //   const post_list = useSelector((state) => state.post.list);

  return (
    <React.Fragment>
      <div>
        <Slide></Slide>
      </div>
      <Image shape="main" />
      <Grid>
        <GridWrap></GridWrap>
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
