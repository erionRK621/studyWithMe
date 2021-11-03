import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Button from "../elements/Button";
import Text from "../elements/Text";

const PostDetail = (props) => {

  const onClickLike = () => {
    console.log("좋아요 버튼 클릭");
  };

  const onClickBookmark = () => {
    console.log("북마크 버튼 클릭");
  };

  const onClickShare = () => {
    console.log("공유 버튼 클릭");
  };


  return (
    <React.Fragment>
      <AspectOutter>
        <ImageCover />
      </AspectOutter>
      <FlexGrid direction="column" margin="auto">
        <H1>title</H1>
        <FlexGrid justify="space-between">
          <FlexGrid align="center">
            <Image />
            <span>
              nerd5555
            </span>
            <span
              style={{
                marginLeft: "4px",
                color: "#cccccc"

              }}
            >
              2021.11.02
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
              <H1 size="10px">수능/입시</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>공간</Text>
              <H1 size="10px">스터디 카페</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>유형</Text>
              <H1 size="10px">친구와 함께</H1>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>

        <FlexGrid>
          {/* CKEditor의 콘텐츠로 대체 예정 */}
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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

const AspectOutter = styled.div`
  width: 100%;
  min-width: 100px;
`;
const ImageCover = styled.div`
  position: relative;
  bottom: 50px;
  overflow: hidden;
  height: calc(100vh - 350px);
  background-image: url("https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
`;

const H1 = styled.h1`
  ${(props) => (props.size ? `font-size:${props.size}` : null)};
`;

const FlexGrid = styled.div`
  display: flex;
  max-width: 1300px;
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)}
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)}
  ${(props) => (props.padding ? `padding:${props.padding};` : null)}
`;
export default PostDetail;