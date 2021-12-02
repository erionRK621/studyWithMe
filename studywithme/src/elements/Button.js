import React from "react";

import styled from "styled-components";
// import bgImg from "../icon/mailbox.png";
import bgImg from "../icon/mailbox1.png";

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
    is_float,
  } = props;
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>
          {text ? text : children}
          <img src={bgImg} />
        </FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    radius: radius,
    bgColor: bgColor,
    color: color,
    fontSize: fontSize,
    height: height,
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
  padding: ${(props) => (props.padding ? props.padding : "12px 0px")};
  box-sizing: border-box;
  border: none;

  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.radius ? `border-radius: ${props.radius}` : null)};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize}` : null)};
  ${(props) => (props.height ? `height:${props.height};` : null)};
  &:hover {
    cursor: pointer;
  }
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background: none;
  box-sizing: border-box;
  font-size: 48px;
  font-weight: 800;
  position: fixed;
  bottom: 200px;
  right: 60px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  padding: 0px;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    right: 16px;
    bottom: 240px;
  }
`;
