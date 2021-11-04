import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const GET_MYPOST = "GET_MYPOST";
const GET_MYBOOKMARKS = "GET_MYBOOKMARKS";

//액션생성함수
//타입이 GET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));
const getMyPost = createAction(GET_MYPOST, (post_list) => ({ post_list }));
const getBookMark = createAction(GET_MYBOOKMARKS, (post_list) => ({
  post_list,
}));

//초기상태값
//paging 시작점, 다음목록정보, 사이즈 3개씩 가져옴
//is_loading 로딩중이니?
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

//게시글하나에 들어가야할 기본내용
const initialPost = {
  body: [
    {
      imageCover: "https://t1.daumcdn.net/cfile/tistory/9937F94B5FF1FB7B0E",
      title: "제목",
      categorySpace: "방 안",
      categoryStudyMate: true,
      categoryInterest: "수능",
      imageContent:
        "https://blog.hmgjournal.com/images_n/contents/180713_desk02.png",
      textContent: "String",
      youtubeUrl: "https://youtu.be/6iVxp-4Gzu0",
    },
  ],
};

// //미들웨어
//내가 작성한 포스트 가져오기
const getMyPostDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getMyPost(userId)
      .then((res) => {
        // console.log(res.data.posts);
        dispatch(getMyPost(res.data.posts));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.log(err, "에러");
      });
  };
};

//내가 북마크한 포스트 가져오기
const getBookMarkDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getBookMark(userId)
      .then((res) => {
        dispatch(getBookMark(res.data.post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MYPOST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.list = action.payload.post_list;
      }),
    [GET_MYBOOKMARKS]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  getMyPostDB,
  getBookMarkDB,
};

export { actionCreators };
