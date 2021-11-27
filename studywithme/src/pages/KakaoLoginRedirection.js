import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "../elements/Spinner";

const KakaoLoginRedirection = (props) => {
    const dispatch = useDispatch();

    // 인가 코드
    let code = new URL(window.location.href).searchParams.get("code");

    // 렌더링되며 인가 코드 백엔드로 넘겨주기
    React.useEffect(async () => {
        await dispatch(userActions.kakaoLoginMiddleware(code));
    }, []);

    return (
        <Spinner />
        // <h1>Kakao Login Redirected Page</h1>
    );
};

export default KakaoLoginRedirection;