import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import signUpImg from "../icon/signup.svg";
import logoImg from "../icon/logo.png";
import logologo from "../icon/logologo.png";

// Redux Modules
import { actionCreators as userActions } from "../redux/modules/user";

// Design-related
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";

// Components

const Header = (props) => {
  const dispatch = useDispatch();

  const { value } = props;

  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.user?.userId);

  // const userId = useSelector((state) => state.user.user.userId);
  // console.log(user.userId);
  const [menuState, setMenuState] = useState(false);

  const [menuColorStateMain, setMenuColorStateMain] = useState(true);
  const [menuColorStateList, setMenuColorStateList] = useState(false);
  const [menuColorStateMyPage, setMenuColorStateMyPage] = useState(false);

  const changeMainColor = () => {
    setMenuColorStateMain(true);
    setMenuColorStateList(false);
    setMenuColorStateMyPage(false);
  };
  const changeListColor = () => {
    setMenuColorStateMain(false);
    setMenuColorStateList(true);
    setMenuColorStateMyPage(false);
  };
  const changeMyPageColor = () => {
    setMenuColorStateMain(false);
    setMenuColorStateList(false);
    setMenuColorStateMyPage(true);
  };

  const onClickLogOut = () => {
    console.log("로그아웃 버튼 클릭");
    dispatch(userActions.logOut());
  };

  const menuHandler = () => {
    if (menuState === false) {
      setMenuState(true);
    } else {
      setMenuState(false);
    }
  };

  // 로그인된 상태의 헤더
  if (user) {
    return (
      <Navbar>
        <NavbarLogo>
          <img
            src={logologo}
            onClick={() => {
              history.push("/");
            }}
          />
        </NavbarLogo>
        <NavbarLogo>
          <img
            src={logoImg}
            onClick={() => {
              history.push("/");
            }}
          />
        </NavbarLogo>

        <NavbarMenu menuState={menuState}>
          <List
            menuColorStateMain={menuColorStateMain}
            onClick={() => {
              history.push("/");
              changeMainColor();
            }}
            // menuColorState={menuColorState}
          >
            메인
          </List>
          <List
            menuColorStateList={menuColorStateList}
            onClick={() => {
              history.push("/list");
              changeListColor();
            }}
          >
            게시글
          </List>
        </NavbarMenu>
        <NavbarIcon menuState={menuState}>
          <InfoList>
            <List
              menuColorStateMyPage={menuColorStateMyPage}
              onClick={() => {
                history.push("/mypage/" + userId);
                changeMyPageColor();
              }}
            >
              마이페이지
            </List>
          </InfoList>
          <InfoList>
            <List onClick={onClickLogOut}>로그아웃</List>
          </InfoList>
          {/* <InfoList>
            <List>알림</List>
          </InfoList> */}
          <InfoList>
            <Write
              onClick={() => {
                history.push("/write");
              }}
            >
              글쓰기
            </Write>
          </InfoList>
        </NavbarIcon>
        <Hamberger href="#">
          <GiHamburgerMenu
            cursor="pointer"
            size="1.7em"
            color="grey"
            onClick={menuHandler}
          />
        </Hamberger>
      </Navbar>
    );
  }

  // 로그인 안 된 상태의 헤더
  else {
    return (
      <Navbar>
        <NavbarLogo>
          <img src={logoImg} />
        </NavbarLogo>

        <NavbarMenu menuState={menuState}>
          <List
            onClick={() => {
              history.push("/");
            }}
          >
            메인
          </List>
          <List
            onClick={() => {
              history.push("/list");
            }}
          >
            게시글
          </List>
        </NavbarMenu>
        <NavbarIcon menuState={menuState}>
          <InfoList>
            <List
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </List>
          </InfoList>
          <InfoList>
            <List
              onClick={() => {
                history.push("/signup");
              }}
            >
              <img src={signUpImg} />
              회원가입
            </List>
          </InfoList>
          <InfoList>
            <Write
              onClick={() => {
                history.push("/login");
              }}
            >
              글쓰기
            </Write>
          </InfoList>
        </NavbarIcon>
        <Hamberger href="#">
          <GiHamburgerMenu
            cursor="pointer"
            size="1.7em"
            color="grey"
            onClick={menuHandler}
          />
        </Hamberger>
      </Navbar>
    );
  }
};

const Navbar = styled.div`
  display: flex;
  align-items: center; /*반대축(현재는 반대축이 수직축)의 속성값 활용 */
  background-color: white;
  padding: 8px 12px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /*로고,메뉴바 모두 왼쪽 정렬*/
    padding: 8px 24px; /*hover시 한줄 가득 색상표시 안되도록 */
  }
`;

const NavbarLogo = styled.div`
  font-size: 24px;
  margin: 0 5px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const NavBtnWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const NavbarMenu = styled.ul`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  padding-left: 0; /*패딩때문에 우측으로 치우쳐있는것을 되돌림*/
  color: black;

  @media screen and (max-width: 768px) {
    ${(props) => (props.menuState === true ? null : "display: none;")}
    flex-direction: column;
    align-items: center; /*메뉴바만 가운데 정렬 */
    width: 100%; /*메뉴바의 가운데 정렬을 위해 너비를 늘림*/
  }
`;

const List = styled.li`
  height: 24px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.menuColorStateMain === true ? "color: #ff8477" : "color: black;"}
  ${(props) =>
    props.menuColorStateList === true ? "color: #ff8477" : "color: black;"}
  ${(props) =>
    props.menuColorStateMyPage === true ? "color: #ff8477" : "color: black;"}

  :hover {
    color: #ffc85c;
    border-radius: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center; /*text는 왼쪽 정렬이 기본값이므로 center로 수정*/
  }
`;

const Write = styled.li`
  padding: 0px 12px;
  width: 84px;
  height: 40px;
  background-color: #ffc85c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  :hover {
    color: black;
    border-radius: 10px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center; /*text는 왼쪽 정렬이 기본값이므로 center로 수정*/
  }
`;

const NavbarIcon = styled.ul`
  width: 75%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding-left: 0; /*패딩때문에 우측으로 치우쳐있는것을 되돌림*/
  color: black;
  @media screen and (max-width: 768px) {
    ${(props) => (props.menuState === true ? null : "display: none;")}
    flex-direction: column;
    align-items: center;
    width: 100%; /*메뉴바의 가운데 정렬을 위해 너비를 늘림*/
  }
`;

const InfoList = styled.div`
  padding: 0 12px;

  :hover {
    color: #ffc85c;
    border-radius: 10px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    text-align: center; /*로고는 현재 반대축이므로 justify-content 사용*/
    width: 100%;
    padding-right: 35px;
  }
`;

const Hamberger = styled.a`
  display: none;
  position: absolute; /*소속된 배치와 무관하게 위치 설정*/
  right: 15px; /*우측에서 32px 거리둠*/
  font-size: 20px;
  color: black;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const IMG = styled.img`
  max-width: 160px;
  :hover {
    cursor: pointer;
  }
`;

export default Header;
