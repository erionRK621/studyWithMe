// Packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

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

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const postId = props.match.params.id;
  const post = useSelector((state) => state.post.detail);
  // const bookmark = useSelector((state) => state.post.detailIsBookmarked);
  const isBookmarked = post.isBookmarked; // true vs. false

  const imageCover =
    post?.imageCover && "http://3.34.44.44/" + post?.imageCover;
  const content = ReactHtmlParser(post?.contentEditor);

  console.log("bookmark", isBookmarked);

  // const bookmarkList = useSelector((state) => state.post.bookmarkList);
  // const bookmarkedPost = bookmarkList?.find((bookmarkedPost) => bookmarkedPost?.postId.toString() === postId);
  // const [isBookmarked, setIsBookmarked] = React.useState(bookmarkedPost ? true : false);
  // const [isBookmarked, setIsBookmarked] = React.useState(post?.isBookmarked);

  const onClickLike = () => {
    console.log("좋아요 버튼 클릭");
  };

  const onClickAddBookmark = () => {
    // console.log("onClickAddBookmark", "setIsBookmarked", isBookmarked);
    // setIsBookmarked(true);
    dispatch(postActions.addBookmarkMiddleware(postId));
  };

  const onClickDeleteBookmark = () => {
    // console.log("onClickDeleteBookmark", "setIsBookmarked", isBookmarked);
    // setIsBookmarked(false);
    dispatch(postActions.deleteBookmarkMiddleware(postId));
  }

  const onClickShare = () => {
    console.log("공유 버튼 클릭");
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
          <H1>{post?.title}</H1>
          <Button _onClick={() => {
            history.push(`/edit/${postId}`)
          }}>수정</Button>
        </FlexGrid>
        <FlexGrid justify="space-between">
          <FlexGrid align="center">
            <Image />
            <span>userNickname</span>
            <span
              style={{
                marginLeft: "20px",
                color: "#cccccc",
              }}
            >
              {post?.date}
            </span>
          </FlexGrid>
          <Button radius="30px" width="100px">
            팔로우
          </Button>
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
          <Button
            text="좋아요"
            width="60px"
            margin="20px"
            _onClick={onClickLike}
          />

          {/* 북마크된 상태라면? 북마크 취소 버튼 활성화 */}
          {/* 북마크 안 된 상태라면? 북마크 추가 버튼 활성화 */}
          {isBookmarked ?
            <Button
              text="북마크 취소하기"
              width="60px"
              margin="20px"
              _onClick={onClickDeleteBookmark}
            />
            :
            <Button
              text="북마크 추가하기"
              width="60px"
              margin="20px"
              _onClick={onClickAddBookmark}
            />
          }
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
