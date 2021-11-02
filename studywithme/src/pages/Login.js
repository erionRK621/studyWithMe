import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";

import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";

import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";
import KakaoLoginButton from "../components/KakaoLoginButton";

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginInputs = {
        email: email,
        password: password,
    };

    const onChangeEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value);
    }

    const onClickLogin = () => {
        console.log("로그인 실행");
        console.log("loginInputs", loginInputs);
        // 이메일 정규표현식 부합 여부 확인
        // 비밀번호 입력 여부 및 형식 확인
        dispatch(userActions.loginMiddleware(loginInputs));
    }


    // const onClickKakaoLogin = () => {
    //     console.log("카카오 계정으로 로그인하기 실행");
    //     document.location = KAKAO_AUTH_URL;
    //     document.location = "http://3.34.44.44/api/kakao";
    // }

    const onClickToSignUpPage = () => {
        console.log("회원가입 페이지로 이동");
        history.push("/signup");
    }

    return (
        <Grid
            width="500px"
        >
            {/* 페이지 제목 */}
            <Grid>
                <h1> 로그인 페이지 </h1>
            </Grid>

            {/* 이메일 로그인 */}
            <Grid>
                {/* 이메일 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>이메일</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={email}
                            type="email"
                            _onChange={onChangeEmail}
                        />
                    </Grid>
                </Grid>

                {/* 비밀번호 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>비밀번호</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={password}
                            type="password"
                            _onChange={onChangePassword}
                        />
                    </Grid>
                </Grid>


                {/* 로그인, 회원가입 버튼 */}
                <Grid
                // is_flex
                >
                    <Grid
                        margin="5px auto"
                    >
                        <Button
                            _onClick={onClickLogin}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid
                        margin="5px auto"
                    >
                        <Button
                            _onClick={onClickToSignUpPage}
                        >
                            회원가입
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* 소셜 로그인 */}
            <Grid>
                <Grid>
                    {/* <Button
                        _onClick={onClickKakaoLogin}
                    >
                        카카오 로그인 (REST API)
                    </Button> */}
                    <KakaoLoginButton />
                </Grid>
            </Grid>

        </Grid>
    )
}

export default Login;