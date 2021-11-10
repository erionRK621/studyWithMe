import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";


import styled from "styled-components";

import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
// import Input from "../elements/Input";
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

    const onClickToSignUpPage = () => {
        console.log("회원가입 페이지로 이동");
        history.push("/signup");
    }

    return (
        <Wrap>
            <Form>
                <InputWrapper>
                    <Label>이메일</Label>
                    <EmailInput
                        placeholder="이메일"
                        value={email}
                        type="email"
                        onChange={onChangeEmail}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label>비밀번호</Label>
                    <PasswordInput
                        placeholder="비밀번호"
                        value={password}
                        type="password"
                        onChange={onChangePassword}
                    />
                </InputWrapper>
                <LoginButton
                    onClick={onClickLogin}
                >
                    로그인
                </LoginButton>
                <ToSignUpWrapper>
                    <ToSignUpLink
                        href="/signup"
                    > 회원가입
                    </ToSignUpLink>
                </ToSignUpWrapper>
                <KakaoSignUpWrapper>
                    <a
                        href={KAKAO_AUTH_URL}
                        style={{
                            margin: "0px 10px",
                        }}
                    >
                        <KakaoIcon
                            src="https://cdn-icons.flaticon.com/png/512/3669/premium/3669973.png?token=exp=1636515714~hmac=ce16ff13ac78e885d49b830f58227d9f"
                            alt="카카오 아이콘"
                        />
                    </a>
                    <KakaoLoginTitle>
                        카카오 계정으로 간편 로그인 / 회원가입
                    </KakaoLoginTitle>
                </KakaoSignUpWrapper>
            </Form>
        </Wrap>
    )
}

export default Login;

const Wrap = styled.div`
flex: 1 0 auto;
margin: 0px auto;
max-width: 300px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 40px 0px;
`;

const Form = styled.div`
width: 300px;
`;

const InputWrapper = styled.div`
padding-bottom: 30px;
`;

const Label = styled.label`
display: block;
width: 100%;
margin: 0px 0px 12px;
font-size: 15px;
font-weight: bold;
color: #292929;
line-height: 21px;
word-break: keep-all;
`;

const EmailInput = styled.input`
display: block;
box-sizing: border-box;
height: 40px;
width: 100%;
padding: 0 15px;
line-height: 40px;
border-radius: 4px;
border: solid 1px #dbdbdb;
background-color: #ffffff;
color: #424242;
font-size: 15px;
`;

const PasswordInput = styled.input`
padding: 8px 15px 9px;
display: inline-block;
width: 100%;
height: 40px;
min-height: 40px;
margin: 0;
border: 1px solid #dbdbdb;
backrgound-color: #fff;
color: #000;
border-radius: 4px;
box-sizing: border-box;
font-size: 15px;
line-height: 21px;
`;

const LoginButton = styled.button`
width: 100%;
padding: 15px 10px;
line-height: 20px;
font-size: 17px;
min-height: 50px;
background-color: #f7f8fa;
display: inline-flex;
justify-content: center;
align-items: center;
border: 1px solid transparent;
font-weight: 700;
text-align: center;
border-radius: 4px;
cursor: pointer;
`;

const ToSignUpWrapper = styled.div`
margin-top: 10px;
width: 100%;
text-align: center;
`;

const ToSignUpLink = styled.a`
text-decoration: none;
letter-spacing: -0.4px;
font-size: 13px;
`;

const KakaoSignUpWrapper = styled.div`
display: flex;
justify-content: center;
margin: 30px 0px;
padding-bottom: 30px;
border-bottom: 1px solid rgb(237, 237 ,237);
`;

const KakaoIcon = styled.img`
width: 48px;
height: 48px;
`;

const KakaoLoginTitle = styled.div`
font-size: 12px;
text-align: center;
margin: 15px 0px;
color: rgb(117, 117, 117);
`;