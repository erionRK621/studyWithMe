import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const ADD_COMMENT_LIKE = "ADD_COMMENT_LIKE";
const DELETE_COMMENT_LIKE = "DELETE_COMMENT_LIKE";

const addComment = createAction(
  ADD_COMMENT,
  (userNickname, comment, avatarUrl) => ({
    userNickname,
    comment,
    avatarUrl,
  })
);

const getComment = createAction(GET_COMMENT, (comment, totalPg) => ({
  comment,
  totalPg,
}));
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
const initialState = {
  list: [],
  totalPg:1,
};

// 댓글 추가
const addCommentMiddleware = (postId, textContent) => {
  return function (dispatch, getState, { history }) {
    apis
      .addCommentAxios(postId, { textContent })
      .then((res) => {
        // const comment = res.data.comment;
        // const nickName = res.data.userNick;
        // const avatarUrl= res.data.avatarUrl;
        const { comment, userNick, avatarUrl } = res.data;
        dispatch(addComment(userNick, comment, avatarUrl));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 댓글 조회
const getCommentMiddleware = (postId, page) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCommentAxios(postId, page)
      .then((res) => {
        dispatch(getComment(res.data.cmtsList, res.data.totalPg));
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
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
        console.log(err.response.data.message);
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
        console.log(err.response.data.message);
      });
  };
};
// 리듀서
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push({
          ...action.payload.comment,
          userNickname: action.payload.userNickname,
          avatarUrl: action.payload.avatarUrl,
          commentLikeCnt: 0,
        });
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment;
        draft.totalPg=action.payload.totalPg;
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
};

export { actionCreators };
