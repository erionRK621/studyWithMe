import React from "react";

import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";

import Grid from "../elements/Grid";
import Button from "../elements/Button";

const KakaoLoginButton = () => {
  const onClickKakaoLogin = () => {
    document.location = KAKAO_AUTH_URL;
  };

  return (
    <Grid>
      <Button _onClick={onClickKakaoLogin}>카카오 로그인</Button>
    </Grid>
  );
};

export default KakaoLoginButton;
