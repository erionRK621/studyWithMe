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
};


// ACTIONS
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const CHECK_EMAIL = "CHECK_EMAIL";
const CHECK_NICKNAME = "CHECK_NICKNAME";


// ACTION CREATORS
const setUser = createAction(SET_USER, (token) => ({ token }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkEmail = createAction(CHECK_EMAIL, (email) => ({ email }));
const checkNickname = createAction(CHECK_NICKNAME, (nickname) => ({ nickname }));


// MIDDLEWARES
const signUpMiddleware = (user) => {
  return function ({ history }) {
    console.log("회원가입 미들웨어 실행!");
    console.log("user", user);
    // 회원가입 API 실행
    apis
      .signUpAxios(user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const loginMiddleware = (user) => {
  return (dispatch, { history }) => {
    console.log("loginMiddleware 실행!");
    console.log("user", user);
    // 로그인 API 실행
    apis
      .logInAxios(user)
      .then((response) => {
        // console.log(response.data.token);
        console.log(jwt_decode(response.data.token));
      })
      .catch((error) => {
        console.log(error.response);
      });
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

const checkEmailMiddleware = (email) => {
  return (dispatch, { history }) => {
    console.log("이메일 중복 체크 미들웨어 실행!");
    console.log("email", email);
    // 이메일 중복 체크 API 실행
    // CHECK_EMAIL 디스패치
  };
};

const checkNicknameMiddleware = (nickname) => {
  return (dispatch, { history }) => {
    console.log("이메일 중복 체크 미들웨어 실행!");
    console.log("nickname", nickname);
    // 닉네임 중복 체크 API 실행
    // CHECK_NICKNAME 디스패치
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
        console.log(response.data.token);
        console.log("decoded", jwt_decode(response.data.token));

        // 프론트 서버 열면 구현할 부분들:
        // 토큰 받아서
        // session에 저장함
        // 로그인 됐으니 메인페이지로 이동
      })
      .catch((error) => {
        console.log("카카오 로그인 에러", error);
        window.alert("로그인에 실패했습니다.");
        // history.replace("/login"); // 로그인이 실패했으니 로그인 화면으로 돌려보냄
      })
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
        // deleteCookie("user");
        // 유저 정보 null
        // 로그인 상태 false
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
)

export const actionCreators = {
  setUser,
  logOut,
  signUpMiddleware,
  loginMiddleware,
  logOutMiddleware,
  checkEmail,
  checkEmailMiddleware,
  checkNickname,
  checkNicknameMiddleware,
  kakaoLoginMiddleware,
}