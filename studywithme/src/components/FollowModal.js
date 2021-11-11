import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import dotenv from "dotenv";

// Font Awesome-related
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons'

// Components
import Image from "../elements/Image";

const FollowModal = ({ modalClose, followingList }) => {
  const dispatch = useDispatch();

  console.log("followingList", followingList);

  const onCloseModal = (e) => {
    // console.log("e.target: ", e.target);
    // console.log("e.tarcurrentTarget", e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <Container onClick={onCloseModal}>
      <Modal>
        <ModalTitle>
          <Title>팔로우</Title>
          <CloseButton>
            <FontAwesomeIcon
              onClick={onCloseModal}
              style={{
                width: "24px",
                height: "24px",
                color: "#9E9D9D"
              }}
              icon={fasTimes} />
          </CloseButton>
        </ModalTitle>
        <ModalBody>
          {followingList.map((following, idx) => {
            return (
              <FlexGrid
                key={following.userId}
              >
                <UserWrapper>
                  <Image
                    size="56"
                    src={`${process.env.REACT_APP_API_URI}/${following.avatarUrl}`}
                  />
                  <UserName
                    size="15px"
                  >
                    {following.nickname}
                  </UserName>
                </UserWrapper>
                <UnfollowButton>언팔로우</UnfollowButton>
              </FlexGrid>
            )
          })}
        </ModalBody>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 565px;
  height: 613px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 20px;
`;

const CloseButton = styled.div`
position: absolute;
top: 26.5px;
right: 56px;
border: none;
background-color: white;
cursor: pointer;
`

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 1px #d3d3d3;
  padding: 25px;
  margin-bottom: 26px;
`;

const Title = styled.div`
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
color: #000000;
`;

const ModalBody = styled.div`
`;

const FlexGrid = styled.div`
display: flex;
justify-content: space-between;
margin-left: 5px;
margin: 0px 46px 16px 46px;
align-items: center;
`;

const UserWrapper = styled.div`
display: flex;
align-items: center;
`;

const UserName = styled.p`
margin-left: 26px;
`;

const UnfollowButton = styled.button`
width: 70px;
height: 27px;
color: white;
background: #369C8A;
border: none;
border-radius: 4px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
cursor: pointer;
`;

export default FollowModal;
