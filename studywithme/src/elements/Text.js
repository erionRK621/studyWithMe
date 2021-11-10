import React from "react";
import styled from "styled-components";

export default function Text(props) {
  const { bold, color, size, lineHeight, children, marginRight, margin } = props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    lineHeight: lineHeight,
    marginRight:marginRight,
    margin:margin,
  };
  return <P {...styles}>{children}</P>;
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  lineHeight: 1.2,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  line-height: ${(props) => props.lineHeight};
  word-break: break-all;
  overflow:hidden;
  ${props=> props.margin? `margin:${props.margin}`:null};
  ${props=> props.marginRight? `margin-right:${props.marginRight}` : null};
`;
