import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import Image from "../elements/Image";
import Button from "../elements/Button";
import Text from "../elements/Text";
// "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
const PostDetail = (props) => {
  const postId = props.match.params.id;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.list);
  const imageCover = "http://3.35.235.79/" + post.imageCover;
  const content = ReactHtmlParser(post.contentEditor);

  const onClickLike = () => {
    console.log("좋아요 버튼 클릭");
  };

  const onClickBookmark = () => {
    console.log("북마크 버튼 클릭");
  };

  const onClickShare = () => {
    console.log("공유 버튼 클릭");
  };

  useEffect(() => {
    dispatch(postActions.getDetailPostDB(postId));
  }, []);
  return (
    <React.Fragment>
      <ImageCover src={imageCover} />
      <FlexGrid direction="column" margin="40px auto">
        <H1>{post.title}</H1>
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
              {post.date}
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
              <H1 size="10px">{post.categoryInterest}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>공간</Text>
              <H1 size="10px">{post.categorySpace}</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>유형</Text>
              <H1 size="10px">{post.categoryStudyMate}</H1>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid margin="40px 0px">
          {/* CKEditor의 콘텐츠로 대체 예정 */}
          {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum." */}
          {content}
        </FlexGrid>

        <FlexGrid justify="center">
          <Button
            text="좋아요"
            width="60px"
            margin="20px"
            _onClick={onClickLike}
          />
          <Button
            text="북마크"
            width="60px"
            margin="20px"
            _onClick={onClickBookmark}
          />
          <Button
            text="공유"
            width="60px"
            margin="20px"
            _onClick={onClickShare}
          />
        </FlexGrid>
      </FlexGrid>
    </React.Fragment>
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
export default PostDetail;
