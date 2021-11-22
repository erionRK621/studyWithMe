import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const SET_PAGE = "SET_PAGE";

//액션생성함수
const setPage = createAction(SET_PAGE, (page, totalPg) => ({ page, totalPg }));

const initialState = {
  page: 1,
  pageList: [],
};
// for (let i = 1; i <= totalPg; i++) {
//   totalPage.push(i);
// }

// 리듀서
export default handleActions(
  {
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
        let pageList = [];
        const currentPage = action.payload.page;
        const totalPage = action.payload.totalPg;
        console.log(totalPage);
        // totalPage가 10보다 작거나 같을때 페이지 리스트를 다 보여준다.
        for(let i=1; i<=totalPage; i++) {
          draft.pageList.push(i);
        }
        // if (totalPage <= 10) {
        //   for (let i = 1; i <= totalPage; i++) {
        //     pageList.push(i);
        //   }
        // }
        // // totalPage가 10보다 크고, totalPage-currentPage
        // else if (totalPage > 10){
        //   for (let i = currentPage; i <= totalPage; i++) {
        //     pageList.push(i);
        //   }
        // }
        // draft.pageList = pageList;
      }),
  },
  initialState
);

const actionCreators = {
  setPage,
};

export { actionCreators };
