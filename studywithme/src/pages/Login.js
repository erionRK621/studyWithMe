import React from "react";

const Login = () => {

    const login = () => {
        console.log("로그인 실행");
        // 로그인 미들웨어 디스패치
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

                {/* 패스워드 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
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
                </div>

                {/* 패스워드 */}
                <div
                    style={{
                        // width: "70%",
                        display: "flex",
                        margin: "5px auto",
                        justifyContent: "center"
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

                {/* 로그인 버튼 */}
                <div
                    style={{
                        margin: "5px 0px",
                        width: "100%",
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