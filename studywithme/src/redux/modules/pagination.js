import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const SET_PAGE = "SET_PAGE";

//액션생성함수
const setPage = createAction(SET_PAGE, (page) => ({ page }));

const initialState = {
  page:1,
};


// 리듀서
export default handleActions(
  {
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),
  },
  initialState
);

const actionCreators = {
  setPage,
};

export { actionCreators };
