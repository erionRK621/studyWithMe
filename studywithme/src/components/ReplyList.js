import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actionCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/configStore";

import Image from "../elements/Image";
import Text from "../elements/Text";
import time from "../shared/time";

import { ReactComponent as Trash } from "../icon/trash.svg";

const ReplyList = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  const commentId = props.commentId;
  const replyList = props.replyList;
  const currentPage = props.currentPage;

  const deleteReply = (childCommentId) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(
        commentActions.deleteCommentReplyMiddleware(
          postId,
          commentId,
          childCommentId
        )
      );
    }
  };
  const moreReply = (currentPage) => {
    currentPage++;
    dispatch(
      commentActions.getCommentReplyMiddleware(postId, commentId, currentPage)
    );
  };
  React.useEffect(() => {
    dispatch(commentActions.getCommentReplyMiddleware(postId, commentId,currentPage));
  }, []);
  return (
    <React.Fragment>
      {replyList?.map((r) => {
        return (
          <FlexGrid
            key={r.childCommentId}
            align="center"
            paddingLeft="50px"
            justify="space-between"
          >
            <FlexGrid justify="space-between" align="center" margin="5px 0px">
              <FlexGrid align="center">
                <FlexGrid align="center" minWidth="130px">
                  <Image
                    size="36"
                    src={`${process.env.REACT_APP_IMAGE_URI}/${r?.avatarUrl}`}
                  />
                  <FlexGrid direction="column" margin="0px 5px">
                    <Text
                      size="15px"
                      _onClick={() => {
                        history.push(`/mypage/${r.userId}`);
                      }}
                      pointer
                    >
                      {r.nickname}
                    </Text>
                    <Text size="10px" color="#cccccc">
                      {time(r.date)}
                    </Text>
                  </FlexGrid>
                </FlexGrid>
                <FlexGrid maxWidth="550px" align="start">
                  <Text>{r.textContent}</Text>
                </FlexGrid>
              </FlexGrid>
            </FlexGrid>
            <Trash
              className="iconButton"
              style={{ width: "15px", height: "15px" }}
              onClick={() => {
                deleteReply(r.childCommentId);
              }}
            />
          </FlexGrid>
        );
      })}
      <MoreButton
        onClick={() => {
          moreReply(currentPage);
        }}
      >
        + 더 보기
      </MoreButton>
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
  margin-top: ${(props) => props.marginTop};
  ${(props) =>
    props.paddingLeft ? `padding-left:${props.paddingLeft};` : null};
`;

const MoreButton = styled.div`
  margin: auto;
  color: #aaaaaa;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
export default ReplyList;
