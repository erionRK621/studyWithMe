import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import _ from "lodash";
import { StaticRouter } from "react-router";

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
        let startIdx = 0;
        let endIdx = 0;
        const showPageCnt = 10;
        const currentPage = action.payload.page;
        const totalPage = action.payload.totalPg;

        if (totalPage > showPageCnt && currentPage >= 7) {
            endIdx = currentPage + 4 > totalPage ? totalPage : currentPage + 4;
            if (endIdx === totalPage) {
              let preCnt = showPageCnt - (totalPage - currentPage + 1); // 현재 누른 페이지의 앞 페이지 개수(현재 누른페이지까지 포함하려고 +1)
              startIdx = currentPage - preCnt;
            } else {
              startIdx = currentPage - 5;
            }
        } else if((totalPage > showPageCnt && currentPage <= 7)){
          startIdx = 1;
          if(totalPage<=10) endIdx = totalPage;
          else endIdx=10;
        } else {
          startIdx=1;
          endIdx=totalPage;
        }
        for (let i = startIdx; i <= endIdx; i++) {
          pageList.push(i);
        }
        
        draft.pageList = pageList;
      }),
  },
  initialState
);

const actionCreators = {
  setPage,
};

export { actionCreators };
