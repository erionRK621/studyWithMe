const CLIENT_ID = "e8c6bc516ea69a3c83c669aeeddf1305";

export const REDIRECT_URI = "http://localhost:3000/api/kakao/callback";
// 프론트 서버 열면 localhost:3000을 프론트 서버 url로 교체

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;