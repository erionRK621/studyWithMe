import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "답글 삭제",
      text: "정말로 답글을 삭제하시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 삭제할래요.",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제완료!", "답글이 삭제되었습니다.", "success");
        dispatch(
          commentActions.deleteCommentReplyMiddleware(
            postId,
            commentId,
            childCommentId
          )
        );
      }
    });
  };
  const moreReply = (currentPage) => {
    currentPage++;
    dispatch(
      commentActions.getCommentReplyMiddleware(postId, commentId, currentPage)
    );
  };
  React.useEffect(() => {
    dispatch(
      commentActions.getCommentReplyMiddleware(postId, commentId, currentPage)
    );
  }, [dispatch]);
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
                  <FlexGrid align="center" minWidth="30px">
                    <Image
                      size="30"
                      src={`${process.env.REACT_APP_IMAGE_URI}/${r?.avatarUrl}`}
                    />
                  </FlexGrid>
                  <NicknameWrap>
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
                  </NicknameWrap>
                </FlexGrid>
                <FlexGrid maxWidth="550px" align="start">
                  <Text>{r.textContent}</Text>
                </FlexGrid>
              </FlexGrid>
            </FlexGrid>
            <Trash
              className="iconButton"
              style={{ width: "15px", height: "15px", minWidth: "15px"}}
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
