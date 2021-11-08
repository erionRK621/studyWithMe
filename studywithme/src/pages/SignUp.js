import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";


const SignUp = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // *** 추가 구현 필요 ***
    // 이메일, 닉네임, 비밀번호, 비밀번호 확인이 없는 경우를 대비한 예외처리

    const signUpInputs = {
        email: email,
        nickname: nickname,
        password: password,
        confirmPassword: confirmPassword,
    };

    const emailCheckInput = { email: email };
    const nicknameCheckInput = { nickname: nickname };

    const onChangeEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }

    const onChangeNickName = (e) => {
        // console.log(e.target.value);
        setNickname(e.target.value);
    }

    const onChangePassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        // console.log(e.target.value);
        setConfirmPassword(e.target.value);
    }

    const onClickEmailCheck = () => {
        // console.log("emailCheckInput", emailCheckInput);
        if (emailCheckInput.email === "") {
            window.alert("이메일을 입력해주세요");
        }
        else {
            dispatch(userActions.checkEmailMiddleware(emailCheckInput));
        }
    }

    const onClickNicknameCheck = () => {
        // console.log("nicknameCheckInput", nicknameCheckInput);
        if (nicknameCheckInput.nickname === "") {
            window.alert("닉네임을 입력해주세요");
        }
        else {
            dispatch(userActions.checkNicknameMiddleware(nicknameCheckInput));
        }
    }

    const onClickSignUp = () => {
        console.log("회원가입 실행");
        console.log("signUpInputs", signUpInputs);
        // 이메일 정규표현식 부합 여부 확인
        // 닉네임 입력 여부 확인
        // 비밀번호 입력 여부 및 형식 확인
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        dispatch(userActions.signUpMiddleware(signUpInputs));
    }



    return (
        <Grid
            width="500px"
        >
            {/* 페이지 제목 */}
            <Grid>
                <h1> 회원가입 페이지 </h1>
            </Grid>

            {/* 페이지 본문 */}
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
                    <Grid>
                        <Button
                            _onClick={onClickEmailCheck}

                        >
                            중복 확인
                        </Button>
                    </Grid>
                </Grid>

                {/* 닉네임 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>닉네임</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={nickname}
                            type="text"
                            _onChange={onChangeNickName}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            _onClick={onClickNicknameCheck}
                        >
                            중복 확인
                        </Button>
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
                    <Grid>
                        {/* <Button>중복 확인</Button> */}
                    </Grid>
                </Grid>

                {/* 비밀번호 확인 */}
                <Grid
                    is_flex
                >
                    <Grid>
                        <Text>비밀번호 확인</Text>
                    </Grid>
                    <Grid>
                        <Input
                            value={confirmPassword}
                            type="password"
                            _onChange={onChangeConfirmPassword}
                        />
                    </Grid>
                    <Grid>
                        {/* <Button>중복 확인</Button> */}
                    </Grid>
                </Grid>

                {/* 회원가입 버튼 */}
                <Grid>
                    <Button
                        _onClick={onClickSignUp}
                    >
                        회원가입
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SignUp;