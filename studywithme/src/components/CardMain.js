import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Image from "../elements/Image";
import dotenv from "dotenv";
dotenv.config();

const Post = (props) => {
  const dispatch = useDispatch();
  console.log(props);

  return (
    <PostContainer>
      <Grid bg="#ffffff" margin="8px 0px" _onClick={props.onClick}>
        <Grid is_flex></Grid>
        <Grid>
          <Image
            shape="rectangle"
            src={`${process.env.REACT_APP_API_URI}/${props.imageCover}`}
            paddingTop="65%"
            borderRadius="10px"
          />
        </Grid>
        <Grid is_flex>
          <Title>{decodeURIComponent(props.title)}</Title>
        </Grid>
        <Grid is_flex>
          <Profile>
            <Image
              shape="circle"
              size="26"
              onClick={() => {
                history.push("/mypage/" + props.userId);
              }}
              src={`${process.env.REACT_APP_API_URI}/${props.avatarUrl}`}
            />
            <Nickname
              onClick={() => {
                history.push("/mypage/" + props.userId);
              }}
              bold
            >
              {props.nickname}
            </Nickname>
          </Profile>
          <CategoryInfo>
            <CategoryItem bold>{props.categorySpace}</CategoryItem>
            <CategoryItem bold>{props.categoryInterest}</CategoryItem>
          </CategoryInfo>
        </Grid>
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
  margin-bottom: 50px;
  border-radius: 5px;
`;
const Title = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;
const Nickname = styled.div`
  font-size: 13px;
  opacity: 0.5;
`;

const CategoryInfo = styled.div`
  display: flex;
`;
const CategoryItem = styled.div`
  display: inline-block;
  border-radius: 10px;
  opacity: 0.5;
  font-size: 13px;
  background-color: #ececec;
  margin: 0 5px;
  padding: 2px 6px;
`;

export default Post;
