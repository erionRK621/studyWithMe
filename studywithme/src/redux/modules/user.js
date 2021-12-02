import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { apis } from "../../lib/axios";
import Swal from "sweetalert2";

import dotenv from "dotenv";
dotenv.config();

// STATES
const initialState = {
  user: null, // 현재 로그인된 유저 정보
  isLoggedIn: false, // 로그인 상태 여부
  checkEmailMsg: "", // 이메일 중복 여부 메세지
  checkNicknameMsg: "", // 닉네임 중복 여부 메세지
  userInfo: "",
  password: "",
};

// ACTIONS
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_PASSWORD = "EDIT_PASSWORD";
const LOG_OUT = "LOG_OUT";
const CHECK_EMAIL = "CHECK_EMAIL";
const CHECK_NICKNAME = "CHECK_NICKNAME";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";


// ACTION CREATORS
const setUser = createAction(SET_USER, (token) => ({ token }));
const getUser = createAction(GET_USER, (userInfo, isFollowing) => ({
  userInfo,
  isFollowing,
}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkEmail = createAction(CHECK_EMAIL, (email) => ({ email }));
const checkNickname = createAction(CHECK_NICKNAME, (nickname) => ({
  nickname,
}));
// FOLLOW
const followUser = createAction(FOLLOW_USER, (isFollowing) => ({
  isFollowing,
}));
const unfollowUser = createAction(UNFOLLOW_USER, (isFollowing) => ({
  isFollowing,
}));

// MIDDLEWARES
const getUserDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getUser(userId)
      .then((res) => {
        dispatch(getUser(res.data.userInfo[0], res.data.isFollowing));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.error(err.response.data.message);
      });
  };
};

const editProfileMiddleware = (userId, formData) => {
  return function (dispatch, getState, { history }) {
    apis
      .editProfileAxios(formData)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
        history.push(`/mypage/${userId}`);
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.error(err.response.data.message);
      });
  };
};

const editPwdMiddleware = (editPwdInputs) => {
  return function (dispatch, getState, { history }) {
    apis
      .editUserPwdAxios(editPwdInputs)
      .then((res) => {
        Swal.fire(res.data.message, "", "success");
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, "", "error");
      });
  };
};

const signUpMiddleware = (user) => {
  // return function (dispatch, getState, { history }) {
  return function (dispatch, getState, { history }) {
    // 회원가입 API 실행
    apis
      .signUpAxios(user)
      .then((response) => {
        Swal.fire(response.data.message, "", "success");
        // window.alert(response.data.message);
        history.push("/login");
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, "", "error");
        // window.alert(err.response.data.message);
      });
  };
};

const loginMiddleware = (user) => {
  return (dispatch, { history }) => {
    // 로그인 API 실행
    apis
      .logInAxios(user)
      .then((response) => {
        const { token } = response.data;

        // 기존 user 토큰이 localStorage에 존재하면? 삭제
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }

        // localStorage에 user 토큰 저장
        localStorage.setItem("user", token);

        // reducer에서 SET_USER 실행
        dispatch(setUser(token));

        // 로그인이 완료됐으므로 메인페이지로 이동
        window.location.href = "/";
      })
      .catch((err) => {
        // window.alert(err.response.data.message);
        Swal.fire(err.response.data.message, "", "error");
      });
  };
};

const checkEmailMiddleware = (emailCheckInput) => {
  return (dispatch, { history }) => {
    apis
      .checkEmailAxios(emailCheckInput)
      .then((response) => {
        // window.alert(response.data.message);
        Swal.fire(response.data.message, "", "success");
      })
      .catch((error) => {
        // window.alert(error.response.data.message);
        Swal.fire(error.response.data.message, "", "error");
      });
  };
};

const checkNicknameMiddleware = (nicknameCheckInput) => {
  return (dispatch, { history }) => {
    apis
      .checkNicknameAxios(nicknameCheckInput)
      .then((response) => {
        // window.alert(response.data.message);
        Swal.fire(response.data.message, "", "success");
      })
      .catch((error) => {
        // window.alert(error.response.data.message);
        Swal.fire(error.response.data.message, "", "error");
      });
  };
};

const kakaoLoginMiddleware = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URI}/api/kakao/callback?code=${code}`,
    })
      .then((response) => {
        const token = response.data.token;

        // 기존 user 토큰이 localStorage에 존재하면? 삭제
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }

        // localStorage에 user 토큰 저장
        localStorage.setItem("user", token);

        // reducer에서 SET_USER 실행
        dispatch(setUser(token));

        // 로그인이 완료됐으므로 메인페이지로 이동
        window.location.href = "/";
      })
      .catch((error) => {
        Swal.fire("로그인에 실패했습니다.", "", "error");
        history.replace("/login"); // 로그인이 실패했으니 로그인 화면으로 돌려보냄
      });
  };
};

// 팔로우
const followUserMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .followUserAxios(userId)
      .then((response) => {
        const isFollowing = response.data.isUser;
        dispatch(followUser(isFollowing));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

const unfollowUserMiddleware = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .unfollowUserAxios(userId)
      .then((response) => {
        const isFollowing = response.data.isUser;
        dispatch(unfollowUser(isFollowing));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
};

// REDUCER
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        const decodedToken = jwt_decode(action.payload.token);
        draft.user = decodedToken;
        draft.isLoggedIn = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        draft.isFollowing = action.payload.isFollowing;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [EDIT_PASSWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.password = action.payload.password;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("user");
        draft.user = null;
        draft.isLoggedIn = false;
        window.location.reload();
      }),
    [CHECK_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        // checkEmailMsg 새로운 상태로 업데이트
      }),
    [CHECK_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        // checkEmailMsg 새로운 상태로 업데이트
      }),
    [FOLLOW_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.isFollowing = action.payload.isFollowing;
      }),
    [UNFOLLOW_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.isFollowing = action.payload.isFollowing;
      }),
  },
  initialState
);

export const actionCreators = {
  setUser,
  getUserDB,
  logOut,
  signUpMiddleware,
  loginMiddleware,
  checkEmail,
  checkEmailMiddleware,
  checkNickname,
  checkNicknameMiddleware,
  kakaoLoginMiddleware,
  editProfileMiddleware,
  editPwdMiddleware,
  followUserMiddleware,
  unfollowUserMiddleware,
};
