import React from "react";
import styled from "styled-components";

// Font Awesome-related
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as fasTimes } from "@fortawesome/free-solid-svg-icons";

// Components
import Image from "../elements/Image";

const FollowerModal = ({ modalClose, followerList }) => {

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <Container onClick={onCloseModal}>
      <Modal>
        <ModalTitle>
          <Title>팔로워</Title>
          <CloseButton>
            <FontAwesomeIcon
              onClick={onCloseModal}
              style={{
                width: "24px",
                height: "24px",
                color: "#9E9D9D",
              }}
              icon={fasTimes}
            />
          </CloseButton>
        </ModalTitle>
        <ModalBody>
          {followerList.map((follower, idx) => {
            return (
              <FlexGrid key={follower.userId}>
                <UserWrapper>
                  <Image
                    size="56"
                    src={`${process.env.REACT_APP_IMAGE_URI}/${follower.avatarUrl}`}
                  />
                  <UserName size="15px">{follower.nickname}</UserName>
                </UserWrapper>
                {/* <DeleteButton>삭제</DeleteButton> */}
              </FlexGrid>
            );
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
  @media screen and (max-width: 768px) {
    width: 370px;
    height: 600px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 26.5px;
  right: 56px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

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

const ModalBody = styled.div``;

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
  margin-left: 120px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
  }
`;

const UserName = styled.p`
  margin-left: 26px;
`;

// const DeleteButton = styled.button`
//   width: 58px;
//   height: 27px;
//   color: white;
//   background: #ffc85c;
//   border: none;
//   border-radius: 4px;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   cursor: pointer;
// `;

export default FollowerModal;
