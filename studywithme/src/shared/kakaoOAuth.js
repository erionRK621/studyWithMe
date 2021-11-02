const CLIENT_ID = "e8c6bc516ea69a3c83c669aeeddf1305";

export const REDIRECT_URI = "http://localhost:3000/api/kakao/callback";
// export const REDIRECT_URI = "http://localhost:3000/api/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;