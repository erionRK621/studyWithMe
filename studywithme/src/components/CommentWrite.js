import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Image from "../elements/Image";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/configStore";
const CommentWrite = (props) => {
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const postId = props.postId;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const registComment = () => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(commentActions.addCommentMiddleware(postId, comment));
    setComment("");
  };

  const noLogIn = () => {
    history.push("/login");
  };

  return (
    <React.Fragment>
      <FlexGrid
        align="center"
        color="#eeeeee"
        padding="10px 0px"
        borderRadius="10px"
        onClick={() => {
          if (!isLoggedIn) {
            noLogIn();
          }
        }}
        isLoggedIn={isLoggedIn}
      >
        <FlexGrid align="center" margin="0px 5px 0px 0px">
          <Image
            size="36"
            src={`${process.env.REACT_APP_IMAGE_URI}/${props?.avatarUrl}`}
          />
        </FlexGrid>
        <Input
          border="none"
          _onChange={commentHandler}
          placeholder={
            isLoggedIn ? "댓글을 입력해주세요." : "로그인 후 이용해주세요."
          }
          is_Submit
          onSubmit={registComment}
          value={comment}
        />
        <Button
          width="40px"
          _onClick={registComment}
          bgColor="transparent"
          color="#FFC85C"
        >
          등록
        </Button>
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
  ${(props) =>
    props.borderRadius ? `border-radius:${props.borderRadius}` : null};
  &:hover {
    ${(props) => (!props.isLoggedIn ? ` cursor:pointer;` : null)};
  }
  & > div > input:hover {
    ${(props) => (!props.isLoggedIn ? ` cursor:pointer;` : null)};
  }
`;

export default CommentWrite;
