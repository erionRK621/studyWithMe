import React from "react";
import styled from "styled-components";

import Image from "../elements/Image";
import Text from "../elements/Text";
const CommentList = (props) => {
  return (
    <React.Fragment>
      <FlexGrid align="center" margin="10px 0px">
        <FlexGrid align="center" margin="0px 10px">
          <Image size="30" />
          <FlexGrid direction="column">
            <Text size="15px">nickName</Text>
            <Text size="10px" color="#cccccc">N개월전</Text>
          </FlexGrid>
        </FlexGrid>
        <FlexGrid>
          <Text>gdklskdlfkskdf</Text>
        </FlexGrid>
      </FlexGrid>
    </React.Fragment>
  );
};
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
export default CommentList;
