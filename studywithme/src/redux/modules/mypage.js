import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션타입생성(리듀서 작성시 재사용되기 때문에 액션타입을 지정하는것임)
const GET_MYPOST = "GET_MYPOST";
const GET_MYBOOKMARKS = "GET_MYBOOKMARKS";
const GET_FOLLOWIMGS = "GET_FOLLOWIMGS";
const GET_FOLLOWERS = "GET_FOLLOWERS";

const MYPOST_ADD_LIKE = "MYPOST_ADD_LIKE";
const MYPOST_DELETE_LIKE = "MYPOST_DELETE_LIKE";

const BOOKMARKED_ADD_LIKE = "BOOKMARKED_ADD_LIKE";
const BOOKMARKED_DELETE_LIKE = "BOOKMARKED_DELETE_LIKE";

//액션생성함수
//타입이 GET_POST인 오브젝트를 반환해주는 액션으로
//const 무엇 = cratAction(타입, (어떤파라미터) => ({변경될파라미터}));
const getMyPost = createAction(GET_MYPOST, (myPostList) => ({ myPostList }));
const getBookMark = createAction(GET_MYBOOKMARKS, (myBookmarkList) => ({
  myBookmarkList,
}));
const getFollowings = createAction(GET_FOLLOWIMGS, (followingIdList) => ({
  followingIdList,
}));
const getFollowers = createAction(GET_FOLLOWERS, (followerIdList) => ({
  followerIdList,
}));

const myPostAddLike = createAction(MYPOST_ADD_LIKE, (postId, isLiked) => ({
  postId,
  isLiked,
}));
const myPostDeleteLike = createAction(
  MYPOST_DELETE_LIKE,
  (postId, isLiked) => ({
    postId,
    isLiked,
  })
);
const bookmarkedPostAddLike = createAction(
  BOOKMARKED_ADD_LIKE,
  (postId, isLiked) => ({
    postId,
    isLiked,
  })
);
const bookmarkedPostDeleteLike = createAction(
  BOOKMARKED_DELETE_LIKE,
  (postId, isLiked) => ({
    postId,
    isLiked,
  })
);

//초기상태값
//paging 시작점, 다음목록정보, 사이즈 3개씩 가져옴
//is_loading 로딩중이니?
const initialState = {
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
  myPost: [],
  bookmarkedPosts: [],
  followingIdList: [],
  followerIdList: [],
};

// //미들웨어
//내가 작성한 포스트 가져오기
const getMyPostMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getMyPostAxios(userId)
      .then((res) => {
        dispatch(getMyPost(res.data.myPosts));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.log(err, "에러");
      });
  };
};

//내가 북마크한 포스트 가져오기
const getBookMarkMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getBookMarkAxios(userId)
      .then((res) => {
        // console.log("리스폰스값", res.data.bookmarkedPosts);
        dispatch(getBookMark(res.data.bookmarkedPosts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getFollowingsMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getFollowingsAxios(userId)
      .then((res) => {
        dispatch(getFollowings(res.data.followingIdList));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};

const getFollowersMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getFollowersAxios(userId)
      .then((res) => {
        // console.log("리스폰스값", res);
        dispatch(getFollowers(res.data.followerIdList));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
      });
  };
};

// 내 게시물 좋아요
const myPostAddLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(myPostAddLike(postId, isLiked));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.alert("로그인 후 사용 가능합니다.");
          history.push("/login");
        }
      });
  };
};

const myPostDeleteLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(myPostDeleteLike(postId, isLiked));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
};

// 북마크 게시물 좋아요
const bookmarkedPostAddLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(bookmarkedPostAddLike(postId, isLiked));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.alert("로그인 후 사용 가능합니다.");
          history.push("/login");
        }
      });
  };
};

const bookmarkedPostDeleteLikeMiddleware = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteLikeAxios(postId)
      .then((res) => {
        const isLiked = res.data.isLiked;
        dispatch(bookmarkedPostDeleteLike(postId, isLiked));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MYPOST]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.myPost = action.payload.myPostList;
      }),
    [GET_MYBOOKMARKS]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.bookmarkedPosts = action.payload.myBookmarkList;
      }),
    [GET_FOLLOWIMGS]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.followingIdList = action.payload.followingIdList;
      }),
    [GET_FOLLOWERS]: (state, action) =>
      produce(state, (draft) => {
        // undifined는 값이 잘넘어가고있다. 값이 나올경우 어딘가에 문제가 있는것
        draft.followerIdList = action.payload.followerIdList;
      }),
    [MYPOST_ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.myPost.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.myPost[idx] = {
          ...draft.myPost[idx],
          likeCnt: draft.myPost[idx].likeCnt + 1,
          isLiked: action.payload.isLiked,
        };
      }),
    [MYPOST_DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.myPost.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.myPost[idx] = {
          ...draft.myPost[idx],
          likeCnt: draft.myPost[idx].likeCnt - 1,
          isLiked: action.payload.isLiked,
        };
      }),
    [BOOKMARKED_ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.bookmarkedPosts.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.bookmarkedPosts[idx] = {
          ...draft.bookmarkedPosts[idx],
          likeCnt: draft.bookmarkedPosts[idx].likeCnt + 1,
          isLiked: action.payload.isLiked,
        };
      }),
    [BOOKMARKED_DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.bookmarkedPosts.findIndex(
          (f) => f.postId === action.payload.postId
        );
        draft.bookmarkedPosts[idx] = {
          ...draft.bookmarkedPosts[idx],
          likeCnt: draft.bookmarkedPosts[idx].likeCnt - 1,
          isLiked: action.payload.isLiked,
        };
      }),
  },
  initialState
);

const actionCreators = {
  getMyPostMiddleware,
  getBookMarkMiddleware,
  getFollowingsMiddleware,
  getFollowersMiddleware,
  myPostAddLikeMiddleware,
  myPostDeleteLikeMiddleware,
  bookmarkedPostAddLikeMiddleware,
  bookmarkedPostDeleteLikeMiddleware,
  
};

export { actionCreators };
