import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postCreators } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";

const Post = (props) => {
  const post_list = useSelector((state) => state.post.list);
  console.log("포스트정보", post_list);
  console.log("포스트의 프롭스", props);

  return (
    <PostContainer>
      <Grid padding="16px" bg="#ffffff" margin="8px 0px">
        <Grid is_flex>
          <Profile>
            <Text bold>{props.date}</Text>
          </Profile>
          <Text>{props.title}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={`${props.imageContent}`} />
        </Grid>
        <Grid is_flex>
          <Text>{props.textContent}</Text>
        </Grid>
        <Grid is_flex>
          <Text bold>댓글2개 </Text>
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
    imageContent:
      "https://blog.hmgjournal.com/images_n/contents/180713_desk02.png",
    textContent: "String",
    youtubeUrl: "https://youtu.be/6iVxp-4Gzu0",
    userNickname: "지방이",
    avatarUrl:
      "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  },
};
const PostContainer = styled.div`
  background-color: white;
  width: 60vw;
  max-width: 350px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

const Profile = styled.div`
  display: flex;
`;

export default Post;
