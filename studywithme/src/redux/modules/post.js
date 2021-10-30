import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const GET_POST = "GET_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//액션생성함수
//타입이 GET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id) => ({ post_id }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

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
//데스크테리어 포스트 가져오기
const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then((res) => {
        // console.log(res.data.posts);
        dispatch(getPost(res.data.posts));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.log(err, "에러");
      });
  };
};

const addPostDB = (formData) => {
  return function (dispatch, getState, { history }) {
    apis.addPost(formData).then((res) => {
      // console.log(decodeURIComponent(res.data.post.encodedHTML));
      // console.log(res.data.post.encodedHTML);
      console.log(res.data.post);
    }).catch((err)=>{
      console.log(err.response.data);
    });
  };
};

// //데스크테리어 포스트 가져오기
// const getPostDB = () => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .getPost()
//       .then((res) => {
//         // console.log(res);
//         // console.log(res.data.data.datainfo);
//         dispatch(getPost(res.data.data.datainfo));
//       })
//       .catch((err) => {
//         //요청이 정상적으로 안됬을때 수행
//         console.log(err, "에러");
//       });
//   };
// };
  

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        console.log(action.payload);
        draft.list = action.payload.post_list;
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        // 배열의 몇 번째에 있는 지 찾습니다.
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        // 해당 위치에 넣어줍니다.
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        // 받아온 id값과 맞지 않는 id의 데이터들을 새로운 배열에 넣어서 기존 list에 덮어쓰기
        let new_post_list = draft.list.filter((p) => {
          if (p.id !== action.payload.post) {
            return p;
          }
        });
        // 새롭게 바뀐 리스트를 현재의 리스트로 변경
        draft.list = new_post_list;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  editPost,
  deletePost,
  getPostDB,
  addPostDB,
};

export { actionCreators };
