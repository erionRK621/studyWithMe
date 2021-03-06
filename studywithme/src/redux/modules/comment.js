import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";
import { actionCreators as pageActions } from "./pagination";

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ADD_COMMENT_LIKE = "ADD_COMMENT_LIKE";
const DELETE_COMMENT_LIKE = "DELETE_COMMENT_LIKE";
const REPLY_WRITE_STATE = "REPLY_WRITE_STATE";
const REPLY_LIST_STATE = "REPLY_LIST_STATE";
const ADD_REPLY = "ADD_REPLY";
const GET_REPLY = "GET_REPLY";
const DELETE_REPLY = "DELETE_REPLY";

const addComment = createAction(
  ADD_COMMENT,
  (userNickname, comment, avatarUrl, totalPg) => ({
    userNickname,
    comment,
    avatarUrl,
    totalPg,
  })
);

const getComment = createAction(
  GET_COMMENT,
  (comment, totalPg, totCmtCount) => ({
    comment,
    totalPg,
    totCmtCount,
  })
);

const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const addCommentLike = createAction(
  ADD_COMMENT_LIKE,
  (isCommentLiked, commentId) => ({
    isCommentLiked,
    commentId,
  })
);
const DeleteCommentLike = createAction(
  DELETE_COMMENT_LIKE,
  (isCommentLiked, commentId) => ({
    isCommentLiked,
    commentId,
  })
);

const replyWriteState = createAction(
  REPLY_WRITE_STATE,
  (writeState, commentId) => ({
    writeState,
    commentId,
  })
);

const replyListState = createAction(
  REPLY_LIST_STATE,
  (replyListState, commentId) => ({
    replyListState,
    commentId,
  })
);

const addCommentReply = createAction(ADD_REPLY, (commentId, user, child) => ({
  commentId,
  user,
  child,
}));
const getCommentReply = createAction(
  GET_REPLY,
  (commentId, childComments, currentPage) => ({
    commentId,
    childComments,
    currentPage,
  })
);
const deleteCommentReply = createAction(
  DELETE_REPLY,
  (commentId, childCommentId) => ({
    commentId,
    childCommentId,
  })
);
const initialState = {
  list: [],
  totalPg: 1,
  totCmtCount: 0,
};

// 댓글 추가
const addCommentMiddleware = (postId, textContent) => {
  return function (dispatch, getState, { history }) {
    apis
      .addCommentAxios(postId, { textContent })
      .then((res) => {
        const { comment, userNick, avatarUrl, totalPg } = res.data;
        // 댓글 작성 시 첫페이지로 돌아간다.
        // totalPg를 setPage인자값으로 넣는 이유는 totalPg의 값에 따라 페이지를 보여주는 방식이 다르다.
        dispatch(pageActions.setPage(1, totalPg));
        dispatch(addComment(userNick, comment, avatarUrl));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

// 댓글 조회
const getCommentMiddleware = (postId, page) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCommentAxios(postId, page)
      .then((res) => {
        dispatch(
          getComment(res.data.cmtsList, res.data.totalPg, res.data.totCmtCount)
        );
        dispatch(pageActions.setPage(page, res.data.totalPg));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

const deleteCommentMiddleware = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteCommentAxios(postId, commentId)
      .then((res) => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};
// 좋아요
const addCommentLikeMiddleWare = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addCommentLikeAxios(postId, commentId)
      .then((res) => {
        const isCommentLiked = res.data.isLiked;
        // const likeCount=res.data.likeCount;
        dispatch(addCommentLike(isCommentLiked, commentId));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};
const deleteCommentLikeMiddleWare = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteCommentLikeAxios(postId, commentId)
      .then((res) => {
        const isCommentLiked = res.data.isLiked;
        dispatch(DeleteCommentLike(isCommentLiked, commentId));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

// 대댓글 작성
const addCommentReplyMiddleware = (postId, commentId, content) => {
  return function (dispatch, getState, { history }) {
    dispatch(replyListState(true, commentId));
    apis
      .addCommentReplyAxios(postId, commentId, content)
      .then((res) => {
        const addReply = res.data;
        const user = addReply.user;
        const child = addReply.child;
        dispatch(addCommentReply(commentId, user, child));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

// 대댓글 조회
const getCommentReplyMiddleware = (postId, commentId, currentPage = 1) => {
  return function (dispatch, getState, { history }) {
    let comment = getState().comment.list;
    const idx = comment.findIndex((c) => 
      c.commentId === commentId
    );
    const beforePage = comment[idx].currentPage;
    if(beforePage ===currentPage) {
      return;
    }
    apis
      .getCommentReplyAxios(postId, commentId, currentPage)
      .then((res) => {
        const childComments = res.data.childComments;
        dispatch(getCommentReply(commentId, childComments, currentPage));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

// 대댓글 삭제
const deleteCommentReplyMiddleware = (postId, commentId, childCommentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteCommentReplyAxios(postId, commentId, childCommentId)
      .then((res) => {
        dispatch(deleteCommentReply(commentId, childCommentId));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};
// 리듀서
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        if (draft.list.length >= 4) {
          draft.list.pop();
        }
        draft.list.unshift({
          ...action.payload.comment,
          childComments: [],
          userNickname: action.payload.userNickname,
          avatarUrl: action.payload.avatarUrl,
          commentLikeCnt: 0,
        });
        draft.totCmtCount++;
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let commentList = [];
        action.payload.comment.map((c) => {
          c.writeState = false;
          c.childComments = [];
          c.replyListState = false;
          commentList.push(c);
        });
        draft.list = commentList;
        draft.totalPg = action.payload.totalPg;
        draft.totCmtCount = action.payload.totCmtCount;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1);
      }),
    [ADD_COMMENT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[idx] = {
          ...draft.list[idx],
          isCommentLiked: action.payload.isCommentLiked,
          commentLikeCnt: draft.list[idx].commentLikeCnt + 1,
        };
      }),
    [DELETE_COMMENT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[idx] = {
          ...draft.list[idx],
          isCommentLiked: action.payload.isCommentLiked,
          commentLikeCnt: draft.list[idx].commentLikeCnt - 1,
        };
      }),
    [REPLY_WRITE_STATE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[idx] = {
          ...draft.list[idx],
          writeState: action.payload.writeState,
        };
      }),
    [REPLY_LIST_STATE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[idx] = {
          ...draft.list[idx],
          replyListState: action.payload.replyListState,
        };
      }),
    [ADD_REPLY]: (state, action) =>
      produce(state, (draft) => {
        const user = action.payload.user;
        const child = action.payload.child;

        const commentIdx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list[commentIdx].childComments.unshift({ ...user, ...child });
      }),
    [GET_REPLY]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        action.payload.childComments.map((c) => {
          draft.list[idx].childComments.push(c);
        });
        draft.list[idx] = {
          ...draft.list[idx],
          currentPage: action.payload.currentPage,
        };
      }),
    [DELETE_REPLY]: (state, action) =>
      produce(state, (draft) => {
        const commentIdx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        const childIdx = draft.list[commentIdx].childComments.findIndex(
          (r) => r.childCommentId === action.payload.childCommentId
        );
        draft.list[commentIdx].childComments.splice(childIdx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  addComment,
  addCommentMiddleware,
  getComment,
  getCommentMiddleware,
  deleteComment,
  deleteCommentMiddleware,
  deleteCommentLikeMiddleWare,
  addCommentLikeMiddleWare,
  replyWriteState,
  replyListState,
  addCommentReplyMiddleware,
  getCommentReplyMiddleware,
  deleteCommentReplyMiddleware,
};

export { actionCreators };
