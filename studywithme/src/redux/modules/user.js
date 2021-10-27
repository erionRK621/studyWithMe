import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import jwt_decode from "jwt-decode";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/cookie";

// STATES
const initialState = {
  user: null, // 현재 로그인된 유저 정보
  isLoggedIn: false, // 로그인 상태 여부
};


// ACTIONS
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";


// ACTION CREATORS
const setUser = createAction(SET_USER, (token) => ({ token }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));


// MIDDLEWARES
const signUpMiddleware = (user) => {
  return function ({ history }) {
    console.log("회원가입 미들웨어 실행!");
    console.log("user", user);
    // 회원가입 API 실행
  }
}

const loginMiddleware = () => {
  return (dispatch, { history }) => {
    // 로그인 API 실행
    // 서버로부터 토큰 받기
    // 기존 쿠키가 있다면? 쿠키를 삭제하고 다시 등록하기
    // setUser 디스패치 w/ 토큰
    // 메인페이지로 이동

    // 실패할 경우
    // 실패 메세지 띄우기
  };
};

const logOutMiddleware = () => {
  return (dispatch, { history }) => {
    // 로그아웃 API 실행
    // logOut 디스패치
    // 페이지 새로고침

    // 실패할 경우
    // 실패 메시지 띄우기
  }
}


// REDUCER
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("SET_USER 리듀서 실행!");
        // 토큰 jwt_decode 실행
        // 유저 정보  = decode된 토큰
        // 로그인 상태 true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log("LOG_OUT 리듀서 실행!");
        // deleteCookie("focus-with-me!!");
        // 유저 정보 null
        // 로그인 상태 false
      }),
  },
  initialState
)

export const actionCreators = {
  setUser,
  logOut,
  signUpMiddleware,
  loginMiddleware,
  logOutMiddleware,
}