import React from "react";
import styled from "styled-components/macro";

export default function SideNavbar() {
  return (
    <SideNavbarWrapper>
      <ProfileWrapper>
        <Profile>안녕하세요, User 님!</Profile>
        {/* <Profile>로그인이 필요합니다.</Profile> */}
      </ProfileWrapper>
      <MenuWrapper>
        <Menu>Board</Menu>
        <Menu>User Dashboard</Menu>
      </MenuWrapper>
    </SideNavbarWrapper>
  );
}

const SideNavbarWrapper = styled.div`
  width: 20%;
  max-width: 300px;
  height: 100%;
  background-color: yellow;
`;

const ProfileWrapper = styled.div`
  background-color: green;
  padding: 3.5rem 1.5rem;
  font-size: 1rem;
`;

const Profile = styled.div``;

const MenuWrapper = styled.div`
  background-color: lime;
`;

const Menu = styled.div`
  cursor: pointer;
  background-color: brown;
  padding: 2rem 1.5rem;
  border-left: 5px solid lime;
`;
