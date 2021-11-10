import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { actionCreators as postActions } from "../redux/modules/post";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";

import dotenv from "dotenv";
dotenv.config();
const Post = (props) => {
  const dispatch = useDispatch();
  const { onClick } = props;
  const [likeState, setLikeState] = useState(false);

  const like = () => {
    if (likeState) {
      setLikeState(false);
      dispatch(postActions.filterDeleteLikeMiddleware(props.postId));
    } else {
      setLikeState(true);
      dispatch(postActions.filterAddLikeMiddleware(props.postId));
    }
    
  };
  return (
    <PostContainer>
      <Grid _onClick={onClick}>
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
        <Grid is_flex justify="start" margin="7px 0px 0px 0px">
          <Text marginRight="20px" color="#aaaaaa">
            좋아요:{props.likeCnt}
          </Text>
          <Text color="#aaaaaa">북마크:{props.bookCnt}</Text>
        </Grid>
      </Grid>
      {likeState? (
        <AiFillLike className="like" size="30" onClick={like} />
      ) : (
        <AiOutlineLike className="like" size="30" onClick={like} />
      )}
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
  width: 100%;
  max-width: 350px;
  margin-top: 30px;
  border-radius: 5px;
  z-index: 1;
  position: relative;
  @media screen and (max-width: 768px) {
    margin: auto;
  }
  &:hover {
    cursor: pointer;
  }
`;
export default Post;
