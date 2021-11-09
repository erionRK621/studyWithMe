import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/cookie";

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

// ACTION CREATORS
const setUser = createAction(SET_USER, (token) => ({ token }));
const getUser = createAction(GET_USER, (userInfo) => ({ userInfo }));
const editUserProfile = createAction(EDIT_PROFILE, (userInfo) => ({
  userInfo,
}));
const editPassword = createAction(EDIT_PASSWORD, (password) => ({
  password,
}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkEmail = createAction(CHECK_EMAIL, (email) => ({ email }));
const checkNickname = createAction(CHECK_NICKNAME, (nickname) => ({
  nickname,
}));

// MIDDLEWARES
const getUserDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getUser(userId)
      .then((res) => {
        dispatch(getUser(res.data.userInfo[0]));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.log(err, "에러");
      });
  };
};

const editProfileMiddleware = (formData) => {
  return function (dispatch, getState, { history }) {
    for (let a of formData.entries()) {
      console.log(a);
    }
    apis
      .editProfileAxios(formData)
      .then((res) => {
        console.log("미들웨어", res.data.userInfo);
        dispatch(editUserProfile(res.data.userInfo));
      })
      .catch((err) => {
        //요청이 정상적으로 안됬을때 수행
        console.log(err, "에러");
        // console.log(err.response.data.message);
      });
  };
};

const editPwdMiddleware = (editPwdInputs) => {
  return function (dispatch, getState, { history }) {
    apis
      .editUserPwdAxios(editPwdInputs)
      .then((res) => {
        console.log(res);
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  };
};

const signUpMiddleware = (user) => {
  // return function (dispatch, getState, { history }) {
  return function (dispatch, getState, { history }) {
    console.log("회원가입 미들웨어 실행!");
    console.log("user", user);
    // 회원가입 API 실행
    apis
      .signUpAxios(user)
      .then((response) => {
        console.log(response.data.message);
        window.alert(response.data.message);
        history.push("/login");
      })
      .catch((error) => {
        console.log("에러 발생");
        console.log(error.response);
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });
  };
};

const loginMiddleware = (user) => {
  return (dispatch, { history }) => {
    console.log("loginMiddleware 실행!");
    // 로그인 API 실행
    apis
      .logInAxios(user)
      .then((response) => {
        const { token } = response.data;

        // 기존 user 토큰이 localStorage에 존재하면? 삭제
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
          console.log("localStorage에 저장된 기존 user 토큰 삭제");
        }

        // localStorage에 user 토큰 저장
        localStorage.setItem("user", token);

        // reducer에서 SET_USER 실행
        dispatch(setUser(token));

        // 로그인이 완료됐으므로 메인페이지로 이동
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const checkEmailMiddleware = (emailCheckInput) => {
  return (dispatch, { history }) => {
    console.log("이메일 중복 체크 미들웨어 실행!");
    console.log("emailCheckInput", emailCheckInput);
    apis
      .checkEmailAxios(emailCheckInput)
      .then((response) => {
        console.log(response.data.message);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });
  };
};

const checkNicknameMiddleware = (nicknameCheckInput) => {
  return (dispatch, { history }) => {
    console.log("이메일 중복 체크 미들웨어 실행!");
    // console.log("nicknameCheckInput", nicknameCheckInput);
    apis
      .checkNicknameAxios(nicknameCheckInput)
      .then((response) => {
        console.log(response.data.message);
        window.alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data?.message);
        window.alert(error.response?.data?.message);
      });
  };
};

const kakaoLoginMiddleware = (code) => {
  return function (dispatch, getState, { history }) {
    console.log("kakaoLoginMiddleware 실행");
    axios({
      method: "GET",
      url: `http://3.34.44.44/api/kakao/callback?code=${code}`,
    })
      .then((response) => {
        console.log("kakaoLoginMiddleware 응답받기 성공");
        const token = response.data.token;

        // 기존 user 토큰이 localStorage에 존재하면? 삭제
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
          console.log("localStorage에 저장된 기존 user 토큰 삭제");
        }

        // localStorage에 user 토큰 저장
        localStorage.setItem("user", token);

        // reducer에서 SET_USER 실행
        dispatch(setUser(token));

        // 로그인이 완료됐으므로 메인페이지로 이동
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("카카오 로그인 에러", error);
        window.alert("로그인에 실패했습니다.");
        history.replace("/login"); // 로그인이 실패했으니 로그인 화면으로 돌려보냄
      });
  };
};

// REDUCER
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("SET_USER 리듀서 실행!");
        const decodedToken = jwt_decode(action.payload.token);
        draft.user = decodedToken;
        draft.isLoggedIn = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [EDIT_PASSWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.password = action.payload.password;
        console.log("리듀서 실행되냐?", action.payload.password);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log("LOG_OUT 리듀서 실행!");
        localStorage.removeItem("user");
        draft.user = null;
        draft.isLoggedIn = false;
        window.location.reload();
      }),
    [CHECK_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log("CHECK_EMAIL 리듀서 실행!");
        // checkEmailMsg 새로운 상태로 업데이트
      }),
    [CHECK_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        console.log("CHECK_NICKNAME 리듀서 실행!");
        // checkEmailMsg 새로운 상태로 업데이트
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
};
