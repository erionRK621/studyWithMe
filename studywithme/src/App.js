// General
import React from "react";
import "./App.css";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { apis } from "./lib/axios";

import { history } from "./redux/configStore";

// Components
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PostWrite from "./pages/PostWrite";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";
import Header from "./shared/Header";
import KakaoLoginRedirection from "./pages/KakaoLoginRedirection";

function App() {
  // 쿠키가 있는지 확인 (getCookie)

  // useEffect
  // 사용자 정보가 redux state에는 없지만 쿠키에는 있을 때, setCookie
  // 사용자 정보가 redux state에는 있지만 쿠키에는 없을 때, 로그인 정보 초기화
  // deps = [dispatch, user, userByCookie]

  return (
    <div>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/api/kakao/callback" exact component={KakaoLoginRedirection} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/list" exact component={PostList} />
        <Route path="/detail/:id" exact component={PostDetail} />
      </ConnectedRouter>
    </div>
  );
}

export default App;