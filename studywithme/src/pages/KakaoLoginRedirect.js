import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// 스피너 불러오기

const KakaoLoginRedirect = (props) => {
    const dispatch = useDispatch();

    // 인가 코드
    let code = new URL(window.location.href).searchParams.get("code");
    console.log("인가 코드", code);

    // 렌더링되며 인가 코드 백엔드로 넘겨주기
    // React.useEffect(async () => {
    //     await dispatch(userActions.kakaoLoginMiddleware(code));
    // }, []);

    return (
        // 스피너 컴포넌트 삽입`
        <h1>Kakao Login Redirected Page</h1>
    );
};

export default KakaoLoginRedirect;