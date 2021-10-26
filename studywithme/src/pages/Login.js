import React from "react";

const Login = () => {

    const emailCheck = () => {
        console.log("이메일 중복 체크 실행");
    }

    const nicknameCheck = () => {
        console.log("닉네임 중복 체크 실행");
    }

    const login = () => {
        console.log("로그인 실행");
    }

    return (
        <React.Fragment>
            <div
                style={{
                    margin: "auto",
                    width: "50%",

                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    로그인 페이지
                </h1>

                {/* 이메일 */}
                <div
                    style={{
                        display: "flex",
                        margin: "5px 0px"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        이메일
                    </div>
                    <div>
                        <input />
                    </div>
                    <div
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <button
                            onClick={emailCheck}
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 닉네임 */}
                <div
                    style={{
                        display: "flex",
                        margin: "5px 0px"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        닉네임
                    </div>
                    <div>
                        <input />
                    </div>
                    <div
                        style={{
                            marginLeft: "5px",
                        }}
                    >
                        <button
                            onClick={nicknameCheck}
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 패스워드 */}
                <div
                    style={{
                        display: "flex",
                        margin: "5px 0px"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        패스워드
                    </div>
                    <div>
                        <input />
                    </div>
                </div>

                {/* 패스워드 확인 */}
                <div
                    style={{
                        display: "flex",
                        margin: "5px 0px"
                    }}
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >
                        패스워드 확인
                    </div>
                    <div>
                        <input />
                    </div>
                </div>

                {/* 로그인 버튼 */}
                <div
                    style={{
                        margin: "5px 0px",
                    }}
                >
                    <button
                        style={{
                            textAlign: "center",
                            width: "100%"
                        }}

                        onClick={login}
                    >
                        로그인
                    </button>
                </div>
            </div>


        </React.Fragment>
    )
}

export default Login;