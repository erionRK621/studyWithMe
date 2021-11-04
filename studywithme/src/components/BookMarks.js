import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Post from "../components/Post";

const BookMarks = (props) => {
  const post_list = useSelector((state) => state.post.list);
  // console.log("포스트의 프롭스", props);
  // console.log("포스트의 이미지", props.ImageCover);

  return (
    <PostContainer>
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
    </PostContainer>
  );
};

BookMarks.defaultProps = {
  body: {
    imageCover: "https://t1.daumcdn.net/cfile/tistory/9937F94B5FF1FB7B0E",
    title: "제목",
    categorySpace: "방 안",
    categoryStudyMate: true,
    categoryInterest: "수능",
    avatarUrl:
      "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
    date: "2021-11-01T11:29:36.000Z",
    contentEditor: "내용",
    postId: 4,
    userId: 1,
  },
};
const PostContainer = styled.div`
  background-color: white;
  width: 80%;
  max-width: 350px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

const GridWrap = styled.div`
  max-width: 1300px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 40px;
`;
export default BookMarks;
