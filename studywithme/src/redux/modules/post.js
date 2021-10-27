import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const GET_POST = "GET_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//액션생성함수
//타입이 SET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id) => ({ post_id }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

//초기상태값
const initialState = {
  list: [],
};

//게시글하나에 들어가야할 기본내용
const initialPost = {
  body: {
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
};

// //미들웨어
// //메인페이지 게시글 가져오기
// const getPostDB = () => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .getPost()
//       .then((res) => {
//         console.log(res);
//         console.log(res.data.newArray);
//         dispatch(setPost(res.data.newArray));
//       })
//       .catch((err) => {
//         //요청이 정상적으로 안됬을때 수행
//         console.log(err, "에러");
//       });
//   };
// };

// //게시글 DB에서 수정하기
// const editPostDB = (post_id, contents = "") => {
//   return function (dispatch, getState, { history }) {
//     console.log(contents);
//     console.log(post_id);
//     const token = getToken();
//     axios
//       .patch(
//         `http://3.35.235.79/api/postings/${post_id}`,
//         {
//           text: contents,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         if (res) {
//           window.alert("수정이 완료되었습니다!");
//           document.location.href = "/";
//         }
//       })
//       .catch((err) => {
//         console.log("업데이트에러", err);
//       });
//   };
// };

// //게시글 DB에서 삭제
// const deletePostDB = (post_id) => {
//   return function (dispatch, getState, { history }) {
//     console.log(post_id);
//     const token = getToken();
//     console.log(token);
//     axios
//       .delete(`http://3.35.235.79/api/postings/${post_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch(deletePost(post_id));
//       })
//       .catch((err) => {
//         console.log("삭제에러", err);
//       });
//   };
// };

// //상세페이지 포스트값 조회
// const getOnePostDB = (post_id) => {
//   return function (dispatch, getState, { history }) {
//     console.log(post_id);

//     axios
//       .get(`http://3.35.235.79/api/postings/${post_id}`, {})
//       .then((res) => {
//         console.log(res);
//         console.log(res.newArray);
//         dispatch(onePost(res.newArray));
//       })
//       .catch((err) => {
//         console.log("좋아요 에러", err);
//       });
//   };
// };

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        console.log(action.payload.post_list);
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
};

export { actionCreators };
