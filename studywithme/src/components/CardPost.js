import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";

import dotenv from "dotenv";
dotenv.config();
const Post = (props) => {
  return (
    <PostContainer>
      
        <Grid is_flex></Grid>
        <Grid>
          <Image
            shape="rectangle"
            src={`${process.env.REACT_APP_API_URI}/${props.imageCover}`}
          />
        </Grid>
        <Grid is_flex>
          <Text>{decodeURIComponent(props.title)}</Text>
        </Grid>
        <Grid is_flex>
          <Text>{props.categorySpace}</Text>
          <Text>{props.categoryInterest}</Text>
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
  width: 80%;
  max-width: 350px;
  margin: auto;
  margin-top: 30px;
  border-radius: 5px;
  
`;

const Profile = styled.div`
  display: flex;
`;
const CategoryInfo = styled.div`
  display: flex;
`;

export default Post;
