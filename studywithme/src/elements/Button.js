import React from "react";

import { Grid } from "./Grid";
import styled from "styled-components";

export default function Button(props) {
  const { text, children, _onClick, is_float, margin, width, padding } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
}

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => { },
  is_float: false,
  margin: false,
  width: "100%",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;
