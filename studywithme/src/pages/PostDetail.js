// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import moment from "moment";
// Redux Modules
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
// Components
import styled from "styled-components";
import Image from "../elements/Image";
import Button from "../elements/Button";
import Text from "../elements/Text";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";
import dotenv from "dotenv";
dotenv.config();
const PostDetail = (props) => {
  const dispatch = useDispatch();

  const postId = props.match.params.id;
  const post = useSelector((state) => state.post.detail);
  const postUserId = post.userId;
  const user = useSelector((state) => state.user.user);
  const userId = user?.userId;
  const isBookmarked = post.isBookmarked;
  const isLiked = post.isLiked;
  const isFollowing = post.isFollowing;
  const imageCover =
    post?.imageCover && process.env.REACT_APP_API_URI + "/" + post?.imageCover;
  const content = ReactHtmlParser(decodeURIComponent(post?.contentEditor));
  console.log(decodeURIComponent(post?.contentEditor));

  const onClickFollow = () => {
    console.log("팔로우 버튼 클릭");
    dispatch(postActions.followUserMiddleware(postUserId));
  }

  const onClickUnfollow = () => {
    console.log("언팔로우 버튼 클릭");
    dispatch(postActions.unfollowUserMiddleware(postUserId));
  }

  const onClickAddLike = () => {
    dispatch(postActions.addLikeMiddleware(postId));
  };

  const onClickDeleteLike = () => {
    dispatch(postActions.deleteLikeMiddleware(postId));
  }

  const onClickAddBookmark = () => {
    dispatch(postActions.addBookmarkMiddleware(postId));
  };

  const onClickDeleteBookmark = () => {
    dispatch(postActions.deleteBookmarkMiddleware(postId));
  };

  const onClickShare = () => {
    console.log("공유 버튼 클릭");
  };

  const deletePost = () => {
    dispatch(postActions.deletePostMiddleware(postId));
  };

  useEffect(() => {
    dispatch(postActions.getDetailPostDB(postId));
    console.log("상세페이지 로딩");
    // dispatch(postActions.loadBookmarkListMiddleware());
    // console.log("북마크 리스트 조회");
  }, [dispatch, postId]);

  return (
    <div className="ck-content">
      <ImageCover src={imageCover} />
      <FlexGrid direction="column" margin="40px auto">
        <FlexGrid>
          <H1>{decodeURIComponent(post?.title)}</H1>
          {postUserId === userId ? (
            <>
              <Button
                margin="0px 20px"
                _onClick={() => {
                  history.push(`/edit/${postId}`);
                }}
              >
                수정
              </Button>
              <Button _onClick={deletePost}>삭제</Button>
            </>
          ) : null}
        </FlexGrid>
        <FlexGrid justify="space-between">
          <FlexGrid align="center">
            <Image src={user?.avatarUrl}/>
            <span>{post.User?.nickname}</span>
            <span
              style={{
                marginLeft: "20px",
                color: "#cccccc",
              }}
            >
              {moment(post?.date).format("YYYY-MM-DD")}
            </span>
          </FlexGrid>
          {isFollowing ?
            <Button
              radius="30px"
              width="100px"
              _onClick={onClickUnfollow}
            >
              언팔로우
            </Button> :
            <Button
              radius="30px"
              width="100px"
              _onClick={onClickFollow}
            >
              팔로우
            </Button>}
        </FlexGrid>
        <FlexGrid
          padding="30px"
          margin="20px 0px"
          justify="space-around"
          color="#dddddd"
        >
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>관심사</Text>
              <H1 size="10px">{post?.categoryInterest}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>공간</Text>
              <H1 size="10px">{post?.categorySpace}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>유형</Text>
              <H1 size="10px">{post?.categoryStudyMate}</H1>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <ContentGrid>{content}</ContentGrid>

        <FlexGrid justify="center">

          {isLiked ? <Button
            text="좋아요 취소하기"
            width="60px"
            margin="20px"
            _onClick={onClickDeleteLike}
          /> :
            <Button
              text="좋아요 추가하기"
              width="60px"
              margin="20px"
              _onClick={onClickAddLike}
            />}

          {/* 북마크된 상태라면? 북마크 취소 버튼 활성화 */}
          {/* 북마크 안 된 상태라면? 북마크 추가 버튼 활성화 */}
          {isBookmarked ? (
            <Button
              text="북마크 취소하기"
              width="60px"
              margin="20px"
              _onClick={onClickDeleteBookmark}
            />
          ) : (
            <Button
              text="북마크 추가하기"
              width="60px"
              margin="20px"
              _onClick={onClickAddBookmark}
            />
          )}
          <Button
            text="공유"
            width="60px"
            margin="20px"
            _onClick={onClickShare}
          />
        </FlexGrid>
        <CommentWrite postId={postId} />
        <CommentList postId={postId} />
      </FlexGrid>
    </div>
  );
};

const ImageCover = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(100vh - 350px);
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

const H1 = styled.h1`
  ${(props) => (props.size ? `font-size:${props.size}` : null)};
`;

const FlexGrid = styled.div`
  display: flex;
  max-width: 750px;
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)}
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)}
  ${(props) => (props.padding ? `padding:${props.padding};` : null)}
`;

const ContentGrid = styled.div`
  p {
    word-break: break-all;
  }
  img {
    max-width: 750px;
  }
`;

export default PostDetail;
