import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";

const addComment = createAction(ADD_COMMENT, (userNickname, comment) => ({
  userNickname,
  comment,
}));

const getComment = createAction(GET_COMMENT, (comment)=>({comment}));

const initialState = {
  list: [],
};

// 댓글 추가
const addCommentMiddleware = (postId, textContent) => {
  return function (dispatch, getState, { history }) {
    console.log(postId, textContent);
    apis
      .addCommentAxios(postId, { textContent })
      .then((res) => {
        const comment = res.data.comment;
        const nickName = res.data.userNick;
        dispatch(addComment(nickName, comment));
        // dispatch(addComment());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 댓글 조회
const getCommentMiddleware = (postId) => {
    return function (dispatch, getState, {history}) {
        apis.getCommentAxios(postId).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
}

// 리듀서
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift({
          ...action.payload.comment,
          userNickname: action.payload.userNickname,
        });
      }),
  },
  initialState
);

const actionCreators = {
  addComment,
  addCommentMiddleware,
  getComment,
  getCommentMiddleware,
};

export { actionCreators };
