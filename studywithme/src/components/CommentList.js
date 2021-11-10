import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { TiDeleteOutline } from "react-icons/ti";

import Image from "../elements/Image";
import Text from "../elements/Text";
import Button from "../elements/Button";
import time from "../shared/time";
const CommentList = (props) => {
  const postId = props.postId;
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment.list);
  const userId = useSelector((state) => state.user.user?.userId);
  const deleteComment = (commentId) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(commentActions.deleteCommentMiddleware(postId, commentId));
    }
  };

  useEffect(() => {
    dispatch(commentActions.getCommentMiddleware(postId));
  }, []);

  return (
    <React.Fragment>
      <FlexGrid direction="column" justify="center" margin="10px 0px">
        {comment.map((c, idx) => {
          return (
            <FlexGrid
              key={c.commentId}
              justify="space-between"
              align="center"
              margin="5px 0px"
            >
              <FlexGrid align="center">
                <FlexGrid align="center" minWidth="120px">
                  <Image size="36" />
                  <FlexGrid direction="column" margin="0px 5px">
                    <Text size="15px">{c.userNickname}</Text>
                    <Text size="10px" color="#cccccc">
                      {time(c.date)}
                    </Text>
                  </FlexGrid>
                </FlexGrid>
                <FlexGrid direction="column" maxWidth="550px">
                  <Text>{c.textContent}</Text>
                  <FlexGrid>
                    <Button padding="0px">좋아요</Button>
                  </FlexGrid>
                </FlexGrid>
              </FlexGrid>
              {c.userId === userId ? (
                <TiDeleteOutline
                  className="deleteButton"
                  onClick={() => {
                    deleteComment(c.commentId);
                  }}
                />
              ) : null}
            </FlexGrid>
          );
        })}
      </FlexGrid>
    </React.Fragment>
  );
};
const FlexGrid = styled.div`
  display: flex;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "750px")};
  ${(props) => (props.minWidth ? `min-width:${props.minWidth};` : null)};
  ${(props) => (props.color ? `background-color:${props.color};` : null)};
  ${(props) => (props.margin ? `margin:${props.margin};` : null)};
  ${(props) => (props.direction ? `flex-direction:${props.direction};` : null)};
  ${(props) => (props.align ? `align-items:${props.align};` : null)};
  ${(props) => (props.justify ? `justify-content:${props.justify};` : null)};
  ${(props) => (props.padding ? `padding:${props.padding};` : null)};
`;
export default CommentList;
