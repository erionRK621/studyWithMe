import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Button from "../elements/Button";
import Text from "../elements/Text";
const PostDetail = (props) => {
  return (
    <React.Fragment>
      <AspectOutter>
        <ImageCover />
      </AspectOutter>
      <FlexGrid direction="column" margin="auto">
        <H1>title</H1>
        <FlexGrid justify="space-between">
          <FlexGrid align="center">
            <Image /> 유저이름, 날짜
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
              <H1 size="10px">수능/입시</H1>
            </FlexGrid>
          </FlexGrid>
          <FlexGrid>
            <Image />
            <FlexGrid direction="column" justify="center">
              <Text>유형</Text>
              <H1 size="10px">수능/입시</H1>
            </FlexGrid>
          </FlexGrid>
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
