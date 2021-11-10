import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";

import dotenv from "dotenv";
dotenv.config();
const Post = (props) => {
  const { onClick } = props;
  return (
    <PostContainer onClick={onClick}>
      <Grid>
        <Image
          shape="rectangle"
          src={`${process.env.REACT_APP_API_URI}/${props.imageCover}`}
          borderRadius="10px"
          paddingTop="100%"
        />
      </Grid>
      <Grid is_flex margin="17px 0px 0px 0px">
        <Text size="16px" bold>
          {decodeURIComponent(props.title)}
        </Text>
      </Grid>
      <Grid is_flex justify="start">
        <Text marginRight="20px">좋아요:{props.likeCnt}</Text>
        <Text>스크랩:{props.bookCnt}</Text>
      </Grid>
    </PostContainer>
  );
};

Post.defaultProps = {
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
  width : 100%;
  max-width: 350px;
  margin-top: 30px;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    margin:auto;
  }
  &:hover{
    cursor: pointer;
  }
`;

export default Post;
