// General
import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import PublicRoute from "./lib/PublicRoute";
import PrivateRoute from "./lib/PrivateRoute";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { history } from "./redux/configStore";
import NotFound from "./shared/NotFound";

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
import MyPage from "./pages/MyPage";
import UserEdit from "./pages/UserEdit";
import Footer from "./shared/Footer";

function App() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.router.location?.pathname);
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
      {!location.includes("/edit") && location !== "/write" ? <Header /> : null}
      <ConnectedRouter history={history}>
        <Switch>
          <PublicRoute restricted component={SignUp} path="/signup" exact />
          <PublicRoute restricted component={Login} path="/login" exact />
          <PublicRoute
            restricted
            component={KakaoLoginRedirection}
            path="/api/kakao/callback"
            exact
          />
          <Route component={Main} path="/" exact />
          <Route component={PostList} path="/list" exact />
          <Route component={PostDetail} path="/detail/:id" exact />
          <Route component={MyPage} path="/mypage/:id" exact />
          <PrivateRoute component={PostWrite} path="/write" exact />
          <PrivateRoute component={PostWrite} path="/edit/:id" exact />
          {user?.userId === parseInt(location.split("/")[2]) ? (
            <Route component={UserEdit} path="/userEdit/:id" exact />
          ) : (
            <Redirect to="/" />
          )}
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
