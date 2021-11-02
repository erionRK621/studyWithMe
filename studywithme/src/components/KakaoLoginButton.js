import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Grid from "../elements/Grid";
import Button from "../elements/Button";

const { Kakao } = window;

const onClickKakaoLogin = () => {
    console.log("카카오 로그인 버튼 실행")

    const scope = "profile_nickname,profile_image, account_email";

    Kakao.Auth.login({
        scope,
        success: function (response) {
            window.Kakao.Auth.setAccessToken(response.access_token);
            console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        }
    })




    Kakao.Auth.authorize({
        redirectUri: "http://localhost:3000/api/kakao/callback"
    })
}

const KakaoLoginButton = () => {
    return (
        <Grid>
            <Button
                _onClick={onClickKakaoLogin}
            >
                카카오 로그인
            </Button>
        </Grid>
    );
}

export default KakaoLoginButton;