import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/kakaoOAuth";
import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import KakaoLogo from "../icon/KakaoLogo.png";

const SignUp = () => {
  const dispatch = useDispatch();

  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // *** 추가 구현 필요 ***
  // 정규표현식으로 인풋 형식들 확인 (백엔드랑 협의)
  // 이메일 중복 확인 여부 체크 (feat. useState)
  // 닉네임 중복 확인 여부 체크 (feat. useState)

  const emailCheckInput = { email: `${emailUsername}@${emailDomain}` };
  const nicknameCheckInput = { nickname: nickname };

  const onChangeEmailUsername = (e) => {
    // console.log(e.target.value);
    setEmailUsername(e.target.value);
  };

  const onChangeEmailDomain = (e) => {
    // console.log(e.target.value);
    setEmailDomain(e.target.value);
  };

  const onChangeNickName = (e) => {
    // console.log(e.target.value);
    setNickname(e.target.value);
  };

  const onChangePassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    // console.log(e.target.value);
    setConfirmPassword(e.target.value);
  };

  const onClickEmailCheck = () => {
    // console.log("emailCheckInput", emailCheckInput);
    if (emailCheckInput.email === "") {
      window.alert("이메일을 입력해주세요");
    } else {
      dispatch(userActions.checkEmailMiddleware(emailCheckInput));
    }
  };

  const onClickNicknameCheck = () => {
    // console.log("nicknameCheckInput", nicknameCheckInput);
    if (nicknameCheckInput.nickname === "") {
      window.alert("닉네임을 입력해주세요");
    } else {
      dispatch(userActions.checkNicknameMiddleware(nicknameCheckInput));
    }
  };

  const onClickSignUp = () => {
    console.log("회원가입 실행");

    const signUpInputs = {
      email: `${emailUsername}@${emailDomain}`,
      nickname: nickname,
      password: password,
      confirmPassword: confirmPassword,
    };

    console.log("signUpInputs", signUpInputs);
    // 이메일 정규표현식 부합 여부 확인
    // 닉네임 입력 여부 확인
    // 비밀번호 입력 여부 및 형식 확인
    // 비밀번호와 비밀번호 확인 일치 여부 확인
    dispatch(userActions.signUpMiddleware(signUpInputs));
  };

  return (
    <Grid width="360px" margin="0px auto" padding="60px 0px">
      <SignUpTitle>회원가입</SignUpTitle>
      <KakaoSignUpWrapper>
        <a
          href={KAKAO_AUTH_URL}
          style={{
            margin: "0px 10px",
          }}
        >
          <KakaoIcon
            src={KakaoLogo}
            alt="카카오 아이콘"
          />
        </a>
        <KakaoLoginTitle>카카오 계정으로 간편하게 회원가입</KakaoLoginTitle>
      </KakaoSignUpWrapper>
      <Form>
        <EmailWrapper>
          <Label>이메일</Label>
          <EmailInputGroup>
            <EmailInputUsername>
              <EmailInput
                placeholder="이메일"
                value={emailUsername}
                type="email"
                onChange={onChangeEmailUsername}
              />
            </EmailInputUsername>
            <EmailInputSeparator>@</EmailInputSeparator>
            <EmailInputDomain>
              <EmailInput
                placeholder="도메인"
                value={emailDomain}
                type="email"
                onChange={onChangeEmailDomain}
              />
            </EmailInputDomain>
          </EmailInputGroup>
        </EmailWrapper>
        <EmailCheckButtonWrapper>
          <EmailValidationButton onClick={onClickEmailCheck}>
            이메일 중복 확인
          </EmailValidationButton>
        </EmailCheckButtonWrapper>
        <NicknameWrapper>
          <Label>닉네임</Label>
          <InputReqDescription>
            다른 유저와 겹치지 않는 별명을 입력해주세요.
          </InputReqDescription>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="별명"
              value={nickname}
              type="text"
              onChange={onChangeNickName}
            />
            <NicknameValidationButton onClick={onClickNicknameCheck}>
              닉네임 중복 확인
            </NicknameValidationButton>
          </NicknameInputContainer>
        </NicknameWrapper>
        <PasswordWrapper>
          <Label>비밀번호</Label>
          <InputReqDescription>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </InputReqDescription>
          <PasswordInput
            placeholder="비밀번호"
            value={password}
            type="password"
            onChange={onChangePassword}
          ></PasswordInput>
        </PasswordWrapper>
        <PasswordWrapper>
          <Label>비밀번호 확인</Label>
          <PasswordInput
            placeholder="비밀번호 확인"
            value={confirmPassword}
            type="password"
            onChange={onChangeConfirmPassword}
          ></PasswordInput>
        </PasswordWrapper>
        <SignUpButton onClick={onClickSignUp}>회원가입하기</SignUpButton>
      </Form>
      <ToLoginGuide>
        이미 아이디가 있으신가요?
        <ToLoginLink href="/login">로그인</ToLoginLink>
      </ToLoginGuide>
    </Grid>
  );
};

export default SignUp;

const SignUpTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const KakaoSignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(237, 237, 237);
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

const Form = styled.div`
  margin: 0px;
  padding: 0px;
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

const EmailWrapper = styled.div``;

const EmailInputGroup = styled.div`
  display: flex;
`;

const EmailInputUsername = styled.span`
  display: flex;
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

const EmailInputSeparator = styled.span`
  flex: 0 0 20px;
  text-align: center;
  line-height: 40px;
  color: #dbdbdb;
`;

const EmailInputDomain = styled.span``;

const EmailCheckButtonWrapper = styled.div`
  margin-bottom: 30px;
  padding-top: 2px;
`;

const EmailValidationButton = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  padding: 0;
  background: #f7f8fa;
  color: #c2c8cc;
  border-color: #dadce0;
  line-height: 20px;
  font-size: 15px;
  min-height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const NicknameWrapper = styled.div`
  margin-bottom: 30px;
`;

const NicknameInputContainer = styled.div`
  display: flex;
`;

const NicknameInput = styled.input`
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

const NicknameValidationButton = styled.button`
  margin-left: 10px;
  width: 250px;
  height: 40px;
  padding: 0;
  background: #f7f8fa;
  color: #c2c8cc;
  border-color: #dadce0;
  line-height: 20px;
  font-size: 15px;
  min-height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const PasswordWrapper = styled.div`
  margin-bottom: 30px;
`;

const InputReqDescription = styled.div`
  margin-bottom: 10px;
  font-size: 13px;
  color: #757575;
  line-height: 1.4;
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

const SignUpButton = styled.button`
  width: 100%;
  font-size: 15px;
  line-height: 26px;
  padding: 11px 10px;
  background: #f7f8fa;
  color: #c2c8cc;
  border-color: #dadce0;
  display: inline-block;
  border: 1px solid transparent;
  font-weight: 700;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

const ToLoginGuide = styled.p`
  color: #424242;
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
`;

const ToLoginLink = styled.a`
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
  padding-left: 10px;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
`;
