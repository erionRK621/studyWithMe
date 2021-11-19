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

import { ReactComponent as DetailLikeOff } from "../icon/detailLikeOff.svg";
import { ReactComponent as DetailLikeOn } from "../icon/detailLikeOn.svg";
import { ReactComponent as BookmarkOff } from "../icon/bookmarkOff.svg";
import { ReactComponent as BookmarkOn } from "../icon/bookmarkOn.svg";
import { ReactComponent as Edit } from "../icon/edit.svg";
import { ReactComponent as Trash } from "../icon/trash.svg";

import { ReactComponent as Interest } from "../icon/interest.svg";
import { ReactComponent as Space } from "../icon/space.svg";
import { ReactComponent as StudyMate } from "../icon/studyMate.svg";

import dotenv from "dotenv";
dotenv.config();

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  const post = useSelector((state) => state.post.detail);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const postUserId = post.userId;
  const user = useSelector((state) => state.user.user);
  const userId = user?.userId;

  const commentCnt = useSelector((state) => state.comment.list?.length);

  const isBookmarked = post.isBookmarked;
  const isLiked = post.isLiked;

  const isFollowing = post.isFollowing;
  const imageCover = decodeURIComponent(
    `${process.env.REACT_APP_IMAGE_URI}/${post?.imageCover}`
  );
  console.log(imageCover);
  const content = ReactHtmlParser(decodeURIComponent(post?.contentEditor));

  const onClickFollow = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.followUserMiddleware(postUserId));
  };
  const onClickUnfollow = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.unfollowUserMiddleware(postUserId));
  };

  const onClickAddLike = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.addLikeMiddleware(postId));
  };

  const onClickDeleteLike = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.deleteLikeMiddleware(postId));
  };

  const onClickAddBookmark = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.addBookmarkMiddleware(postId));
  };

  const onClickDeleteBookmark = () => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(postActions.deleteBookmarkMiddleware(postId));
  };

  const deletePost = () => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(postActions.deletePostMiddleware(postId));
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
    dispatch(postActions.getDetailPostDB(postId));
  }, []);

  return (
    <div className="ck-content">
      <ImageCover src={imageCover} />
      <FlexGrid direction="column" margin="40px auto" padding="0px 24px">
        <FlexGrid justify="space-between" align="center">
          <H1 size="32px">{decodeURIComponent(post?.title)}</H1>
          {postUserId === userId ? (
            <FlexGrid>
              <Edit
                className="iconButton"
                style={{ marginRight: "16px" }}
                onClick={() => {
                  history.push(`/edit/${postId}`);
                }}
              />
              <Trash className="iconButton" onClick={deletePost} />
            </FlexGrid>
          ) : null}
        </FlexGrid>
        <FlexGrid justify="space-between" align="center">
          <FlexGrid align="center">
            <Image
              size="80"
              src={`${process.env.REACT_APP_IMAGE_URI}/${post.User?.avatarUrl}`}
            />
            <Span
              marginLeft="10px"
              fontSize="30px"
              onClick={() => {
                history.push(`/mypage/${post.userId}`);
              }}
              pointer
            >
              {post.User?.nickname}
            </Span>
            <Span marginLeft="20px" color="#cccccc">
              {moment(post?.date).format("YYYY-MM-DD")}
            </Span>
          </FlexGrid>
          {userId !== postUserId ? (
            isFollowing ? (
              <Button
                height="40px"
                fontSize="16px"
                bgColor="#FFC85C"
                radius="30px"
                width="100px"
                color="#000000"
                _onClick={onClickUnfollow}
                padding="8px 0px"
              >
                언팔로우
              </Button>
            ) : (
              <Button
                height="40px"
                fontSize="16px"
                bgColor="#FFC85C"
                radius="30px"
                width="100px"
                color="#000000"
                _onClick={onClickFollow}
                padding="8px 0px"
              >
                팔로우
              </Button>
            )
          ) : null}
        </FlexGrid>
        <FlexGrid
          padding="30px"
          margin="20px 0px"
          justify="space-around"
          color="rgb(236, 236, 236)"
          borderRadius="10px"
        >
          <FlexGrid>
            <Interest />
            <FlexGrid direction="column" justify="center">
              <Text size="16px">관심사</Text>
              <H1 size="20px">{post?.categoryInterest}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Space />
            <FlexGrid direction="column" justify="center">
              <Text size="16px">공간</Text>
              <H1 size="20px">{post?.categorySpace}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <StudyMate />
            <FlexGrid direction="column" justify="center">
              <Text size="16px">유형</Text>
              <H1 size="20px">{post?.categoryStudyMate}</H1>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <ContentGrid>{content}</ContentGrid>

        <FlexGrid justify="center">
          {isLiked ? (
            <DetailLikeOn
              className="detailOnOff iconButton"
              onClick={onClickDeleteLike}
            />
          ) : (
            <DetailLikeOff
              className="detailOnOff iconButton"
              onClick={onClickAddLike}
            />
          )}

          {/* 북마크된 상태라면? 북마크 취소 버튼 활성화 */}
          {/* 북마크 안 된 상태라면? 북마크 추가 버튼 활성화 */}
          {isBookmarked ? (
            <BookmarkOn
              className="detailOnOff iconButton"
              onClick={onClickDeleteBookmark}
            />
          ) : (
            <BookmarkOff
              className="detailOnOff iconButton"
              onClick={onClickAddBookmark}
            />
          )}
        </FlexGrid>
        <Text margin="10px 0px" size="15px">
          댓글: <span style={{ color: "#FFC85C" }}>{commentCnt}</span>
        </Text>

        <CommentWrite postId={postId} avatarUrl={post?.currentAvatar} />
        <CommentList postId={postId} />
      </FlexGrid>
    </div>
  );
};

const ImageCover = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(100vh - 200px);
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

const H1 = styled.h1`
  ${(props) => (props.size ? `font-size:${props.size}` : null)};
`;

const FlexGrid = styled.div`
  display: flex;
  max-width: 720px;
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)};
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)};
  ${(props) => (props.padding ? `padding:${props.padding};` : null)};
  ${(props) =>
    props.borderRadius ? `border-radius: ${props.borderRadius}` : null};
`;

const ContentGrid = styled.div`
  margin-top: 44px;
  margin-bottom: 20px;
  min-height: 300px;
  p {
    word-break: break-all;
  }
  img {
    max-width: 750px;
  }
`;

const Span = styled.span`
  margin-left: ${(props) => props.marginLeft};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (props.color ? props.color : "black")};
  &:hover {
    ${(props) => (props.pointer ? "cursor:pointer;" : null)};
  }
`;

export default PostDetail;
