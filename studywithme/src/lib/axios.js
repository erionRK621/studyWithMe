import axios from "axios";

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소

  baseURL: "",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    //authorization: `Bearer ${localStorage.getItem("token")}`,
    // "Access-Control-Allow-Origin": true,
  },
});

export default instance;
