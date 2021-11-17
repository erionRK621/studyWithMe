import React from "react";
import styled from "styled-components";

// Image 함수형 컴포넌트를 만들어 준다.
const Image = (props) => {
  const {
    shape,
    src,
    size,
    _onClick,
    borderRadius,
    paddingTop,
    className,
    minWidth,
  } = props;

  const styles = {
    src: src,
    size: size,
    borderRadius: borderRadius,
    paddingTop: paddingTop,
    minWidth: minWidth,
  };

  if (shape === "circle") {
    return (
      <ImageCircle
        minWidth={minWidth}
        {...styles}
        onClick={_onClick}
      ></ImageCircle>
    );
  }

  if (shape === "card") {
    return <CardImage {...styles} onClick={_onClick}></CardImage>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter className={className} borderRadius={borderRadius}>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }

  //   if (shape === "main") {
  //     return <MainInner {...styles} onClick={_onClick}></MainInner>;
  //   }

  return (
    <React.Fragment>
      <ImageDefault {...styles} onClick={_onClick}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://newsimg.hankookilbo.com/cms/articlerelease/2017/01/22/201701222050082111_1.jpg",
  size: 36,
  _onClick: () => {},
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const AspectOutter = styled.div`
  width: auto;
  min-width: 100px;
  ${(props) =>
    props.borderRadius ? `border-radius:${props.borderRadius};` : null}
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "75%")};
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0px"};
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "null")};
`;

const CardImage = styled.div`
  width: 100%;
  height: auto;
`;

export default Image;
