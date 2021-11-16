// 참조
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=julist1101&logNo=220660814114

// 이메일 체크 정규표현식
// 도메인 포함 50자 이하
// 비밀번호와 겹치는 부분이 있어선 안됨
export const regExEmailTest = (email) => {
    const regExEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExEmail.test(email);
};

// 닉네임 체크 정규표현식
// 영문, 한글, 숫자만 가능
export const regExNicknameTest = (nickname) => {
    const regExNickname = /^[가-힣a-zA-Z0-9]+$/;
    return regExNickname.test(nickname);
};

// 비밀번호 체크 정규표현식
// 8자 이상, 특수 문자 포함
// 이메일과 겹치는 부분이 있어선 안됨
export const regExPasswordTest = (password) => {
    const regExPassword = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return regExPassword.test(password);
};