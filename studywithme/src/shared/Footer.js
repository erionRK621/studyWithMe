import React from "react";
import styled from "styled-components";
import logo from "../icon/footerLogo.png";

const Footer = () => {
  return (
    <FooterWrap>
      <Wrap>
        <FooterBtnList>
          <MenuList>
            <Title>Service</Title>
            <p>서비스 소개</p>
            <p>서비스 이용 방법</p>
          </MenuList>
          {/* <li>
            <Title>Support</Title>
            <p>공지사항</p>
            <p>문의하기</p>
          </li> */}
          <MenuList>
            <Title>Team</Title>
            <p>프론트엔드</p>
            <p>백엔드</p>
          </MenuList>

          <li>
            <ImgContents>
              <img src={logo} style={{ maxWidth: "100%" }} alt="" />

              <CopyRight>
                © 2021 Project Letskkirri. All rights reserved.
              </CopyRight>
            </ImgContents>
          </li>
        </FooterBtnList>
      </Wrap>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  width: 100%;
  margin: auto;
  height: 180px;
  color: #707070;
  background-color: #ececec;
  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: black;
  @media screen and (max-width: 768px) {
    margin-top: 14px;
    font-size: 14px;
  }
`;

const Wrap = styled.div`
  max-width: 1134px;
  background-color: #ececec;
  padding: 0px 40px;
  margin: auto;
  @media screen and (max-width: 768px) {
    max-width: 768px;
    font-size: 8px;
    padding: 0px;
    height: 150px;
  }
`;

const FooterBtnList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  /* flex-direction:row;
    flex-wrap: wrap;
    align-items:flex-start; */
  margin: 30px auto 0 auto;
  padding: 50px auto;
  list-style: none;
  & li {
    display: block;
    list-style-type: none;
    box-sizing: border-box;
    margin: 30px 0 16px 0;
    text-align: center;
  }
`;
const MenuList = styled.li`
  margin: auto;
`;

const CopyRight = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    font-size: 4px;
  }
`;

const ImgContents = styled.div`
  position: absolute;
  z-index: 2;
  right: 10%;
  @media screen and (max-width: 768px) {
    width: 100px;
    right: 10%;
  }
`;

export default Footer;
