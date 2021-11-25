import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/configStore";
//icon
import { ReactComponent as Trash } from "../icon/trash.svg";
import { ReactComponent as CommentLikeOff } from "../icon/commentLikeOff.svg";
import { ReactComponent as CommentLikeOn } from "../icon/commentLikeOn.svg";
import { ReactComponent as CommentLikeCnt } from "../icon/commentLikeCntIcon.svg";
import ReplyList from "./ReplyList";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Image from "../elements/Image";
import Text from "../elements/Text";
import time from "../shared/time";
import Pagination from "../shared/Pagination";
const CommentList = (props) => {
  const postId = props.postId;
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const comment = useSelector((state) => state.comment);
  const currentPage = useSelector((state) => state.pagination.page);
  const user = useSelector((state) => state.user.user);
  const userId = user?.userId;
  const deleteComment = (commentId) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(commentActions.deleteCommentMiddleware(postId, commentId));
    }
  };
  const deleteLike = (postId, commentId) => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(commentActions.deleteCommentLikeMiddleWare(postId, commentId));
  };
  const addLike = (postId, commentId) => {
    if (!isLoggedIn) {
      window.alert("로그인 후 사용해주세요.");
      history.push("/login");
    }
    dispatch(commentActions.addCommentLikeMiddleWare(postId, commentId));
  };
  // 답글 작성 창 열기.
  const openCommentWrite = (writeState, commentId) => {
    if (writeState) {
      writeState = false;
    } else {
      writeState = true;
    }
    dispatch(commentActions.replyWriteState(writeState, commentId));
  };

  // 답글 리스트 열기.
  const openCommentReplyList = (replyListState, commentId) => {
    if (replyListState) {
      replyListState = false;
    } else {
      replyListState = true;
    }
    dispatch(commentActions.replyListState(replyListState, commentId));
  };

  const commentReplyHandler = (e) => {
    setReply(e.target.value);
  };
  const registReply = (commentId) => {
    setReply("");
    dispatch(
      commentActions.addCommentReplyMiddleware(postId, commentId, reply)
    );
  };
  useEffect(() => {
    dispatch(commentActions.getCommentMiddleware(postId, currentPage));
  }, [currentPage]);

  return (
    <React.Fragment>
      <FlexGrid direction="column" justify="center" margin="10px 0px">
        {comment.list.map((c, idx) => {
          return (
            <FlexGrid key={c.commentId} direction="column">
              <FlexGrid justify="space-between" align="center" margin="5px 0px">
                <FlexGrid align="center">
                  <FlexGrid align="center" minWidth="130px">
                  <FlexGrid align="center" minWidth="44px">
                    <Image
                      size="36"
                      src={`${process.env.REACT_APP_IMAGE_URI}/${c?.avatarUrl}`}
                    />
                    </FlexGrid>
                    <NicknameWrap>
                      <Text
                        size="15px"
                        _onClick={() => {
                          history.push(`/mypage/${c.userId}`);
                        }}
                        pointer
                      >
                        {c.userNickname}
                      </Text>
                      <Text size="10px" color="#cccccc">
                        {time(c.date)}
                      </Text>
                    </NicknameWrap>
                  </FlexGrid>
                  <FlexGrid direction="column" maxWidth="500px">
                    <Text>{c.textContent}</Text>
                    
                  </FlexGrid>
                  
                </FlexGrid>
                
                {c.userId === userId ? (
                  <Trash
                    className="iconButton"
                    style={{ width: "20px", height: "20px", minWidth:"20px"}}
                    onClick={() => {
                      deleteComment(c.commentId);
                    }}
                  />
                ) : c.isCommentLiked ? (
                  <CommentLikeOn
                    className="iconButton"
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => {
                      deleteLike(postId, c.commentId);
                    }}
                  />
                ) : (
                  <CommentLikeOff
                    className="iconButton"
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => {
                      addLike(postId, c.commentId);
                    }}
                  />
                )}
              </FlexGrid>
              <FlexGrid marginTop="5px">
                      <CommentLikeCnt />
                      <Text margin="0px 5px" color="#aaaaaa">
                        {c.commentLikeCnt}
                      </Text>
                      <Text
                        margin="0px 10px"
                        color="#aaaaaa"
                        size="13px"
                        pointer
                        _onClick={() => {
                          openCommentWrite(c.writeState, c.commentId);
                        }}
                      >
                        {c.writeState ? "답글 취소" : "답글"}
                      </Text>
                      <Text
                        color="#aaaaaa"
                        size="13px"
                        pointer
                        _onClick={() => {
                          openCommentReplyList(c.replyListState, c.commentId);
                        }}
                      >
                        {c.replyListState? "답글 숨기기" : "답글 보기"}
                      </Text>
                    </FlexGrid>
              {c.writeState ? (
                <FlexGrid
                  align="center"
                  paddingLeft="50px"
                  justify="space-between"
                >
                  <FlexGrid align="center" minWidth="44px">
                  <Image
                    size="36"
                    src={`${process.env.REACT_APP_IMAGE_URI}/${props?.avatarUrl}`}
                  />
                  </FlexGrid>
                  <Input
                    borderBottom
                    borderRadius="none"
                    placeholder="답글을 작성 해주세요."
                    _onChange={commentReplyHandler}
                    value={reply}
                  />
                  <Button
                    width="40px"
                    bgColor="transparent"
                    color="#FFC85C"
                    _onClick={() => {
                      registReply(c.commentId);
                    }}
                  >
                    등록
                  </Button>
                </FlexGrid>
              ) : null}
              {c.replyListState ? (
                  <ReplyList
                    postId={postId}
                    commentId={c.commentId}
                    replyList={c.childComments}
                    currentPage = {c.currentPage}
                  />
              ) : null}
            </FlexGrid>
          );
        })}
        <FlexGrid align="center" margin="auto">
          <Pagination
            totalPg={comment.totalPg}
            itemLength={comment?.list.length}
          />
        </FlexGrid>
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
  margin-top: ${(props) => props.marginTop};
  ${(props) =>
    props.paddingLeft ? `padding-left:${props.paddingLeft};` : null};
`;

const NicknameWrap = styled.div`
  display: flex;
  flex-direction:column;
  margin: 0px 5px;
  min-width: 138px;
  @media screen and (max-width: 768px) {
    max-width:76px;
    min-width: 10px;
  }
`;


export default CommentList;
