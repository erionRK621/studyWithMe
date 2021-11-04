import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";
import { AiFillHeart } from "react-icons/ai";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
// 게시물
const GET_POST = "GET_POST";
const SET_POST = "SET_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
//북마크
const LOAD_BOOKMARK_LIST = "LOAD_BOOKMARK_LIST";
const ADD_BOOKMARK = "ADD_BOOKMARK";
const DELETE_BOOKMARK = "DELETE_BOOKMARK";

//액션생성함수
//타입이 GET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));
// 게시물
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const setPost = createAction(SET_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (post_id) => ({ post_id }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
// 북마크
const loadBookmarkList = createAction(LOAD_BOOKMARK_LIST, (bookmarkList) => ({ bookmarkList }));
const addBookmark = createAction(ADD_BOOKMARK, (bookmark) => ({ bookmark }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (bookmark) => ({ bookmark }));

//초기상태값
//paging 시작점, 다음목록정보, 사이즈 3개씩 가져옴
//isLoading 로딩중이니?
const initialState = {
  list: [],
  detail: [],
  paging: { start: null, next: null, size: 3 },
  isLoading: false,
  bookmarkList: [],
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

// 상세페이지 포스트 가져오기
const getDetailPostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    // console.log("getDetailPostDB 실행");
    apis
      .getDetailPost(postId)
      .then((res) => {
        dispatch(setPost(res.data.post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getFilterPostDB = (queryString) => {
  return function (dispatch, getState, { history }) {
    console.log(queryString);
    apis
      .getFilterPost(queryString)
      .then((res) => {
        const post_list = res.data.posts;
        dispatch(getPost(post_list));
        history.push(`list?searchMode=filter${queryString ? queryString : ""}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostDB = (formData) => {
  return function (dispatch, getState, { history }) {
    apis
      .addPost(formData)
      .then((res) => {
        // console.log(decodeURIComponent(res.data.post.encodedHTML));
        // console.log(res.data.post.encodedHTML);
        console.log(res.data.post);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

const loadBookmarkListMiddleware = () => {
  return function (dispatch, getState, { history }) {
    console.log("loadBookmarkListMiddleware 실행");
    apis
      .loadBookmarkListAxios()
      .then((response) => {
        // console.log("bookmarkedList", response.data.bookmarkedPosts);
        const bookmarkList = response.data.bookmarkedPosts;
        dispatch(loadBookmarkList(bookmarkList));
      })
      .catch((error) => {
        console.log(error);
      })
    // loadBookmarkListAxios API 호출
    // response = 나의 북마크 리스트
    // loadBookmarkList 디스패치
  }
}

const addBookmarkMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("addBookmarkMiddleware 실행");
    apis
      .addBookmarkAxios(postId)
      .then((response) => {
        console.log(response.data);
        window.alert("북마크 추가 완료");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }
}

const deleteBookmarkMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("deleteBookmarkMiddleware 실행");
    apis
      .deleteBookmarkAxios(postId)
      .then((response) => {
        console.log(response.data);
        window.alert("북마크 취소 완료");
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.list = action.payload.post_list;
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post;
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
    [LOAD_BOOKMARK_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log("LOAD_BOOKMARK_LIST 리듀서 실행");
        draft.bookmarkList = action.payload.bookmarkList;
        // draft.bookmarList에 나의 북마크 리스트 담기
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        console.log("ADD_BOOKMARK 리듀서 실행");
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        console.log("ADD_BOOKMARK 리듀서 실행");
      }),

  },
  initialState
);

const actionCreators = {
  getPost,
  editPost,
  deletePost,
  getPostDB,
  getFilterPostDB,
  getDetailPostDB,
  addPostDB,
  loadBookmarkListMiddleware,
  addBookmarkMiddleware,
  deleteBookmarkMiddleware,
};

export { actionCreators };
