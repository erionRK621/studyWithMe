import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";

const Post = (props) => {
  const post_list = useSelector((state) => state.post.list);
  // console.log("포스트의 프롭스", props);
  // console.log("포스트의 이미지", props.ImageCover);

  return (
    <PostContainer>
      <Grid padding="16px" bg="#ffffff" margin="8px 0px">
        <Grid is_flex></Grid>
        <Grid>
          <Image
            shape="rectangle"
            src={`http://3.35.235.79/${props.imageCover}`}
          />
        </Grid>
        <Grid is_flex>
          <Text>{props.title}</Text>
        </Grid>
        <Grid is_flex>
          <Profile>
            <Text bold>{props.userId}</Text>
            {/* <Text bold>{props.avatarUrl}</Text> */}
          </Profile>
          <CategoryInfo>
            <Text bold>{props.categorySpace}</Text>
            <Text bold>{props.categoryInterest}</Text>
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
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

const Profile = styled.div`
  display: flex;
`;
const CategoryInfo = styled.div`
  display: flex;
`;

export default Post;
