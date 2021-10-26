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
    console.log("회원가입 미들웨어 실행!")
    // 회원가입 API 실행
  }
}

// setUserMiddleware 
// apis.setUserAxios() {

//}
// dispatch(setUser)


// REDUCER
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("SET_USER 리듀서 실행!");
      })
  },
  initialState
)

export const actionCreators = {
  setUser,
  logOut,
  signUpMiddleware,
}