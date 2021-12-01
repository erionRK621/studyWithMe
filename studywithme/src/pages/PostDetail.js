// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import Swal from "sweetalert2";
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

  const commentCnt = useSelector((state) => state.comment?.totCmtCount);

  const isBookmarked = post.isBookmarked;
  const isLiked = post.isLiked;

  const isFollowing = post.isFollowing;
  const imageCover = decodeURIComponent(
    `${process.env.REACT_APP_IMAGE_URI}/${post?.coverCropped}`
  );
  const content = ReactHtmlParser(decodeURIComponent(post?.contentEditor));

  const onClickFollow = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
      history.push("/login");
    }
    dispatch(postActions.followUserMiddleware(postUserId));
  };
  const onClickUnfollow = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
      history.push("/login");
    }
    dispatch(postActions.unfollowUserMiddleware(postUserId));
  };

  const onClickAddLike = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
      history.push("/login");
    }
    dispatch(postActions.addLikeMiddleware(postId));
  };

  const onClickDeleteLike = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
      history.push("/login");
    }
    dispatch(postActions.deleteLikeMiddleware(postId));
  };

  const onClickAddBookmark = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
      history.push("/login");
    }
    dispatch(postActions.addBookmarkMiddleware(postId));
  };

  const onClickDeleteBookmark = () => {
    if (!isLoggedIn) {
      Swal.fire("로그인 후 사용해주세요.", "", "error");
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
    window.scrollTo(0, 0);
    dispatch(postActions.getDetailPostDB(postId));
  }, [dispatch, postId]);

  return (
    <div className="ck-content">
      {/* <ImageCover src={imageCover} /> */}
      <Image
        shape="rectangle"
        src={imageCover}
        paddingTop="50%"
        maxWidth="1133px"
      ></Image>
      <Wrap direction="column" margin="40px auto" padding="0px 24px">
        <TitleLineWrap>
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
        </TitleLineWrap>
        <ProfileLineWrap>
          <ProfileWrap>
            <PicDiv>
              <Image
                size="80"
                src={`${process.env.REACT_APP_IMAGE_URI}/${post.User?.avatarUrl}`}
              />
            </PicDiv>
            <NickTimeWrap>
              <UserNick
                onClick={() => {
                  history.push(`/mypage/${post.userId}`);
                }}
              >
                {post.User?.nickname}
              </UserNick>
              <Time>{moment(post?.date).format("YYYY-MM-DD")}</Time>
            </NickTimeWrap>
          </ProfileWrap>
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
                margin="auto 0px"
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
                margin="auto 0px"
              >
                팔로우
              </Button>
            )
          ) : null}
        </ProfileLineWrap>
        <TypeAreaWrap>
          <TypeGrid>
            <Interest />
            <TypeWrap>
              <TypeTitle>관심사</TypeTitle>
              <TypeElement size="20px">{post?.categoryInterest}</TypeElement>
            </TypeWrap>
          </TypeGrid>
          <TypeGrid>
            <Space />
            <TypeWrap>
              <TypeTitle>공간</TypeTitle>
              <TypeElement size="20px">{post?.categorySpace}</TypeElement>
            </TypeWrap>
          </TypeGrid>
        </TypeAreaWrap>

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
        <CommentList postId={postId} avatarUrl={post?.currentAvatar} />
      </Wrap>
    </div>
  );
};

const ImageCover = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(100vh - 200px);
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 300px;
    margin: auto;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  padding: 0 24px;
  max-width: 720px;
`;

const TitleLineWrap = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
`;
const ProfileLineWrap = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  vertical-align: auto;
`;

const H1 = styled.h1`
  ${(props) => (props.size ? `font-size:${props.size}` : null)};
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 720px;
`;

const NickTimeWrap = styled.div`
  display: flex;
  margin: auto;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
`;

const PicDiv = styled.div`
  min-width: 40px;
`;

const UserNick = styled.div`
  margin-left: 10px;
  font-size: 30px;
  line-height: 30px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const Time = styled.div`
  margin-left: 20px;
  color: #cccccc;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const TypeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TypeTitle = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;
const TypeElement = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const TypeAreaWrap = styled.div`
  padding: 30px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
`;

const TypeGrid = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
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
  margin: 44px 0 20px 0;
  min-height: 300px;
  p {
    word-break: break-all;
  }
  img {
    max-width: 750px;
  }
`;

export default PostDetail;
