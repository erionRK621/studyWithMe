import React, { Fragment } from "react";
import styled from "styled-components";

export default function Grid(props) {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    _onClick,
    justify,
    position,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    justify: justify,
    position: position,
  };
  return (
    <Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </Fragment>
  );
}

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: "#ffffff",
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""};
  ${(props) => (props.justify ? `justify-content: ${props.justify}` : null)};
  ${(props) => (props.position ? `position: ${props.position}` : null)};
`;
