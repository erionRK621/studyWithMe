import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
// 무한스크롤 로딩
const LODING = "LODING";

// 게시물
const GET_POST = "GET_POST";
const GET_FILTER_POST = "GET_FILTER_POST";
const SET_POST = "SET_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
//북마크
const LOAD_BOOKMARK_LIST = "LOAD_BOOKMARK_LIST";
const ADD_BOOKMARK = "ADD_BOOKMARK";
const DELETE_BOOKMARK = "DELETE_BOOKMARK";
// 좋아요
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";
const FILTER_ADD_LIKE = "FILTER_ADD_LIKE";
const FILTER_DELETE_LIKE = "FILTER_DELETE_LIKE";
// 팔로우
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

//액션생성함수
//타입이 GET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));

// 무한스크롤 로딩
const loading = createAction(LODING, (isLoading) => ({ isLoading }));

// 게시물
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const getFilterPost = createAction(
  GET_FILTER_POST,
  (post_list, totalPage, currentPage) => ({
    post_list,
    totalPage,
    currentPage,
  })
);
const setPost = createAction(
  SET_POST,
  (post, isBookmarked, isLiked, isFollowing, currentNick, currentAvatar) => ({
    post,
    isBookmarked,
    isLiked,
    isFollowing,
    currentNick,
    currentAvatar,
  })
);
const editPost = createAction(EDIT_POST, (post_id) => ({ post_id }));
// 북마크
const loadBookmarkList = createAction(LOAD_BOOKMARK_LIST, (bookmarkList) => ({
  bookmarkList,
}));
const addBookmark = createAction(ADD_BOOKMARK, (postDetail, isBookmarked) => ({
  postDetail,
  isBookmarked,
}));
const deleteBookmark = createAction(
  DELETE_BOOKMARK,
  (postDetail, isBookmarked) => ({ postDetail, isBookmarked })
);
// 좋아요
const addLike = createAction(ADD_LIKE, (postDetail, isLiked) => ({
  postDetail,
  isLiked,
}));
const deleteLike = createAction(DELETE_LIKE, (postDetail, isLiked) => ({
  postDetail,
  isLiked,
}));

const filterAddLike = createAction(FILTER_ADD_LIKE, (postId, isLiked) => ({
  postId,
  isLiked,
}));
const filterDeleteLike = createAction(
  FILTER_DELETE_LIKE,
  (postId, isLiked) => ({
    postId,
    isLiked,
  })
);
// 팔로우
const followUser = createAction(FOLLOW_USER, (postDetail, isFollowing) => ({
  postDetail,
  isFollowing,
}));
const unfollowUser = createAction(UNFOLLOW_USER, (postDetail, isFollowing) => ({
  postDetail,
  isFollowing,
}));

//초기상태값
//paging 시작점, 다음목록정보, 사이즈 3개씩 가져옴
//isLoading 로딩중이니?
const initialState = {
  list: [], // 전체 게시물 리스트
  filterList: [],
  detail: [], // 현재 상세 페이지의 게시물 정보
  totalPage: 1,
  currentPage: 0,
  isLoading: false,
  bookmarkList: [], // 현재 로그인된 유저가 북마크한 게시물 리스트
};

// //미들웨어
//데스크테리어 포스트 가져오기
const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then((res) => {
        console.log(res.data);
        dispatch(getPost(res.data));
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
    apis
      .getDetailPost(postId)
      .then((res) => {
        const isBookmarked = res.data.isBookmarked;
        const isLiked = res.data.isLiked;
        const isFollowing = res.data.isFollowing;
        const post = res.data.post;
        const currentNick = res.data.currentNick;
        const currentAvatar = res.data.currentAvatar;
        dispatch(
          setPost(
            post,
            isBookmarked,
            isLiked,
            isFollowing,
            currentNick,
            currentAvatar
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getFilterPostDB = (queryString, currentPage) => {
  return function (dispatch, getState, { history }) {
    const totalPage = getState().post.totalPage;
    console.log(queryString);
    if (currentPage >= totalPage) {
      return;
    }
    if (!currentPage) {
      currentPage = 0;
    }
    dispatch(loading(true));
    currentPage++;
    apis
      .getFilterPost(queryString)
      .then((res) => {
        const post_list = res.data.posts;
        const totalPage = res.data.totalPage;
        console.log("1111111 ::::: ",res.data)
        console.log("2222222222 ::::::: ",totalPage);
        dispatch(getFilterPost(post_list, totalPage, currentPage));
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
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

const deletePostMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deletePostAxios(postId)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 게시물 수정
const editPostMiddleware = (postId, formData) => {
  return function (dispatch, getState, { history }) {
    apis
      .editPostAxios(postId, formData)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
      });
  };
};

const addBookmarkMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("addBookmarkMiddleware 실행");
    const postDetail = getState().post.detail;
    console.log("postDetail", postDetail);
    apis
      .addBookmarkAxios(postId)
      .then((response) => {
        const isBookmarked = response.data.isBookmarked;
        console.log("isBookmarked", isBookmarked);
        dispatch(addBookmark(postDetail, isBookmarked));
        // window.alert("북마크 추가 완료");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
};

const deleteBookmarkMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("deleteBookmarkMiddleware 실행");
    const postDetail = getState().post.detail;
    console.log("postDetail", postDetail);
    apis
      .deleteBookmarkAxios(postId)
      .then((response) => {
        const isBookmarked = response.data.isBookmarked;
        console.log("isBookmarked", isBookmarked);
        dispatch(deleteBookmark(postDetail, isBookmarked));
        // window.alert("북마크 취소 완료");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
};

const addLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("addLikeMiddleware 실행");
    const postDetail = getState().post.detail;
    apis
      .addLikeAxios(postId)
      .then((response) => {
        console.log(response);
        const isLiked = response.data.isLiked;
        console.log("isLiked", isLiked);
        dispatch(addLike(postDetail, isLiked));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
};

const deleteLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("deleteLikeMiddleware 실행");
    const postDetail = getState().post.detail;
    apis
      .deleteLikeAxios(postId)
      .then((response) => {
        console.log(response);
        const isLiked = response.data.isLiked;
        console.log("isLiked", isLiked);
        dispatch(deleteLike(postDetail, isLiked));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
};

// 필터페이지 좋아요
const filterAddLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(filterAddLike(postId, isLiked));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.alert("로그인 후 사용 가능합니다.");
        }
      });
  };
};

const filterDeleteLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(filterDeleteLike(postId, isLiked));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
};

const followUserMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    console.log("followUserMiddleware 실행");
    console.log("userId", userId);
    const postDetail = getState().post.detail;
    apis
      .followUserAxios(userId)
      .then((response) => {
        const isFollowing = response.data.isUser;
        console.log("isFollowing", isFollowing, typeof isFollowing);
        dispatch(followUser(postDetail, isFollowing));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const unfollowUserMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    console.log("unfollowUserMiddleware 실행");
    console.log("userId", userId);
    const postDetail = getState().post.detail;
    apis
      .unfollowUserAxios(userId)
      .then((response) => {
        const isFollowing = response.data.isUser;
        console.log("isFollowing", isFollowing, typeof isFollowing);
        dispatch(unfollowUser(postDetail, isFollowing));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.list = action.payload.post_list;
      }),
    [GET_FILTER_POST]: (state, action) =>
      produce(state, (draft) => {
        if(action.payload.currentPage===1) {
          draft.filterList = action.payload.post_list;
        } else {
          draft.filterList.push(...action.payload.post_list);
        }
        draft.totalPage = action.payload.totalPage;
        draft.currentPage = action.payload.currentPage;
        draft.isLoading = false;
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = {
          ...action.payload.post,
          isBookmarked: action.payload.isBookmarked,
          isLiked: action.payload.isLiked,
          isFollowing: action.payload.isFollowing,
          currentNick: action.payload.currentNick,
          currentAvatar: action.payload.currentAvatar,
        };
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        // 배열의 몇 번째에 있는 지 찾습니다.
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        // 해당 위치에 넣어줍니다.
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOAD_BOOKMARK_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log("LOAD_BOOKMARK_LIST 리듀서 실행");
        draft.bookmarkList = action.payload.bookmarkList;
      }),
    [FOLLOW_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("FOLLOW_USER 리듀서 실행");
        console.log("action.payload.postDetail", action.payload.postDetail);
        console.log("action.payload.isFollowing", action.payload.isFollowing);
        draft.detail = {
          ...action.payload.postDetail,
          isFollowing: action.payload.isFollowing,
        };
      }),
    [UNFOLLOW_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("UNFOLLOW_USER 리듀서 실행");
        console.log("action.payload.postDetail", action.payload.postDetail);
        console.log("action.payload.isFollowing", action.payload.isFollowing);
        draft.detail = {
          ...action.payload.postDetail,
          isFollowing: action.payload.isFollowing,
        };
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = {
          ...action.payload.postDetail,
          isBookmarked: action.payload.isBookmarked,
        };
      }),
    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = {
          ...action.payload.postDetail,
          isBookmarked: action.payload.isBookmarked,
        };
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = {
          ...action.payload.postDetail,
          isLiked: action.payload.isLiked,
        };
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = {
          ...action.payload.postDetail,
          isLiked: action.payload.isLiked,
        };
      }),
    [FILTER_ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.filterList.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.filterList[idx] = {
          ...draft.filterList[idx],
          likeCnt: draft.filterList[idx].likeCnt + 1,
          isLiked: action.payload.isLiked,
        };
      }),
    [FILTER_DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.filterList.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.filterList[idx] = {
          ...draft.filterList[idx],
          likeCnt: draft.filterList[idx].likeCnt - 1,
          isLiked: action.payload.isLiked,
        };
      }),
    [LODING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  editPost,
  deletePostMiddleware,
  getPostDB,
  getFilterPostDB,
  getDetailPostDB,
  addPostDB,
  loadBookmarkListMiddleware,
  addBookmarkMiddleware,
  deleteBookmarkMiddleware,
  editPostMiddleware,
  addLikeMiddleware,
  deleteLikeMiddleware,
  followUserMiddleware,
  unfollowUserMiddleware,
  filterAddLikeMiddleware,
  filterDeleteLikeMiddleware,
};

export { actionCreators };
