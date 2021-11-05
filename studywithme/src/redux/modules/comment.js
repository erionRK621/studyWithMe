import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const addComment = createAction(ADD_COMMENT, (userNickname, comment) => ({
  userNickname,
  comment,
}));

const getComment = createAction(GET_COMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const initialState = {
  list: [],
};

// 댓글 추가
const addCommentMiddleware = (postId, textContent) => {
  return function (dispatch, getState, { history }) {
    apis
      .addCommentAxios(postId, { textContent })
      .then((res) => {
        const comment = res.data.comment;
        const nickName = res.data.userNick;
        dispatch(addComment(nickName, comment));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 댓글 조회
const getCommentMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCommentAxios(postId)
      .then((res) => {
        dispatch(getComment(res.data.respondComments));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteCommentMiddleware = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deletePostAxios(postId, commentId)
      .then((res) => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.log(err);
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
        });
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1);
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
};

export { actionCreators };
