import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";

// Redux Modules
import { actionCreators as userActions } from "../redux/modules/user";

// Design-related
import styled from "styled-components";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

// Components
import Text from "../elements/Text";
import Button from "../elements/Button";

export const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [menuState, setMenuState] = useState(false);

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
          <IMG />
        </NavbarLogo>

        <NavbarMenu menuState={menuState}>
          <List
            onClick={() => {
              history.push("/");
            }}
          >
            홈
          </List>
          <List
            onClick={() => {
              history.push("/list");
            }}
          >
            게시글 모아보기
          </List>
        </NavbarMenu>
        <NavbarIcon menuState={menuState}>
          <InfoList>
            <FaUserAlt
              cursor="pointer"
              size="1.7em"
              color="grey"
              onClick={() => {
                history.push("/mypage");
              }}
            />
          </InfoList>
          <InfoList>
            <BiLogIn cursor="pointer" size="1.7em" color="grey" />
          </InfoList>
          <InfoList onClick={onClickLogOut}>
            <BiLogOut cursor="pointer" size="1.7em" color="grey" />
          </InfoList>
          <InfoList>
            <FaBell cursor="pointer" size="1.7em" color="grey" />
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
        <Text color="white">로그인 안 됨</Text>
        <Button
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Button>
      </Navbar>
    );
  }
};

const Navbar = styled.div`
  display: flex;
  justify-content: space-between; /*중심축 배치 (현재는 중심축이 수평축)*/
  align-items: center; /*반대축(현재는 반대축이 수직축)의 속성값 활용 */
  background-color: black;
  padding: 8px 12px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /*로고,메뉴바 모두 왼쪽 정렬*/
    padding: 8px 24px; /*hover시 한줄 가득 색상표시 안되도록 */
  }
`;

const NavbarLogo = styled.div`
  font-size: 24px;
  color: white;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0; /*패딩때문에 우측으로 치우쳐있는것을 되돌림*/
  color: white;
  @media screen and (max-width: 768px) {
    ${(props) => (props.menuState === true ? null : "display: none;")}
    flex-direction: column;
    align-items: center; /*메뉴바만 가운데 정렬 */
    width: 100%; /*메뉴바의 가운데 정렬을 위해 너비를 늘림*/
  }
`;

const List = styled.li`
  padding: 8px 12px; /*마우스 클릭영역확보*/

  :hover {
    background-color: red;
    border-radius: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center; /*text는 왼쪽 정렬이 기본값이므로 center로 수정*/
  }
`;

const NavbarIcon = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0; /*패딩때문에 우측으로 치우쳐있는것을 되돌림*/
  color: white;
  @media screen and (max-width: 768px) {
    ${(props) => (props.menuState === true ? null : "display: none;")}
    flex-direction: column;
    align-items: center;
    width: 100%; /*메뉴바의 가운데 정렬을 위해 너비를 늘림*/
  }
`;

const InfoList = styled.li`
  padding: 8px 12px; /*마우스 클릭영역확보*/
  :hover {
    background-color: red;
    border-radius: 10px;
  }
  @media screen and (max-width: 768px) {
    text-align: center; /*로고는 현재 반대축이므로 justify-content 사용*/
    width: 100%;
  }
`;

const Hamberger = styled.a`
  display: none;
  position: absolute; /*소속된 배치와 무관하게 위치 설정*/
  right: 15px; /*우측에서 32px 거리둠*/
  font-size: 20px;
  color: black;

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