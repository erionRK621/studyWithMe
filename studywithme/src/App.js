// General
import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { apis } from "./lib/axios";
import { history } from "./redux/configStore";
import { getCookie } from "./shared/cookie";

// Redux Modules
import { actionCreators as userActions } from "./redux/modules/user";

// Components
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PostWrite from "./pages/PostWrite";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";
import Header from "./shared/Header";
import KakaoLoginRedirection from "./pages/KakaoLoginRedirection";
import Mypage from "./pages/Mypage";
import UserEdit from "./pages/UserEdit";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const userTokenInLocalStorage = localStorage.getItem("user");

  // *** 추가 구현 필요 ***
  // 백엔드에서 설정한 토큰 만료기간이 지났을 경우?
  // [백엔드] 프론트에게 토큰이 만료되었다는 신호를 보내줌
  // [프론트] 토큰이 더 이상 유효하지 않다는 알림을 유저에게 띄움
  // [프론트] 유효기간이 지난 토큰을 제거하고 자동 로그아웃 시킴

  useEffect(() => {
    // 사용자 정보가 리덕스에는 없지만 로컬 스토리지에는 있을 때? SET_USER 실행
    if (!user && userTokenInLocalStorage) {
      dispatch(userActions.setUser(localStorage.getItem("user")));
    }
    // 사용자 정보가 리덕스에는 있지만 로컬 스토리지에는 없을 때? 로그인 정보 초기화
    if (user && !userTokenInLocalStorage) {
      dispatch(userActions.setUser(null));
    }
  }, [dispatch, user, userTokenInLocalStorage]);

  return (
    <div>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/api/kakao/callback"
          exact
          component={KakaoLoginRedirection}
        />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/list" exact component={PostList} />
        <Route path="/detail/:id" exact component={PostDetail} />
        <Route path="/edit/:id" exact component={PostWrite} />
        <Route path="/mypage/:id" exact component={Mypage} />
        <Route path="/userEdit/:id" exact component={UserEdit} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
