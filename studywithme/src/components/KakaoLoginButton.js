import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";

import Grid from "../elements/Grid";
import Button from "../elements/Button";

const KakaoLoginButton = () => {

    const onClickKakaoLogin = () => {
        console.log("카카오 계정으로 로그인하기 실행");
        document.location = KAKAO_AUTH_URL;
    }

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