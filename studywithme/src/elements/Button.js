import React from "react";

import styled from "styled-components";

export default function Button(props) {
  const {
    text,
    children,
    _onClick,
    margin,
    width,
    padding,
    radius,
    bgColor,
    color,
    fontSize,
    height,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    radius: radius,
    bgColor: bgColor,
    color: color,
    fontSize:fontSize,
    height:height
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
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "",
  padding: "",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#212121")};
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  padding: ${(props)=>props.padding? props.padding: "12px 0px"};
  box-sizing: border-box;
  border: none;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.radius ? `border-radius: ${props.radius}` : null)};
  ${(props) => props.fontSize? `font-size:${props.fontSize}` : null};
  ${(props) => props.height? `height:${props.height};`:null};
  &:hover {
    cursor: pointer;
  }
`;
