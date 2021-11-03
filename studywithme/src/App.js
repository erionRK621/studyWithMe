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

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const userInCookie = getCookie("user");

  useEffect(() => {
    // 사용자 정보가 리덕스에는 없지만 쿠키에는 있을 때? SET_USER 실행
    if (!user && userInCookie) {
      dispatch(userActions.setUser(getCookie("user")));
    }
    // 사용자 정보가 리덕스에는 있지만 쿠키에는 없을 때? 로그인 정보 초기화
    if (user && !userInCookie) {
      dispatch(userActions.setUser(null));
    }
  }, [dispatch, user, userInCookie]);

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
        <Route path="/mypage" exact component={Mypage} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
