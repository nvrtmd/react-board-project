import React from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";

function SideNavbar({ isSignedin }) {
  const navigate = useNavigate();

  const isClicked = (tabName) => {
    const basePath = window.location.pathname.split("/")[1];
    if (tabName === basePath) {
      if (basePath === "user") {
        return window.location.pathname === "/user/list";
      }
      return true;
    }
  };

  return (
    <SideNavbarWrapper>
      <ProfileWrapper>
        {isSignedin ? (
          <Profile>안녕하세요, User 님!</Profile>
        ) : (
          <Profile>로그인이 필요합니다.</Profile>
        )}
      </ProfileWrapper>
      <TabWrapper>
        <Tab
          isClicked={isClicked("board")}
          onClick={() => navigate("/board/list")}
        >
          Board
        </Tab>
        <Tab
          isClicked={isClicked("user")}
          onClick={() => navigate("/board/list")}
        >
          User Dashboard
        </Tab>
      </TabWrapper>
    </SideNavbarWrapper>
  );
}

const SideNavbarWrapper = styled.div`
  width: 23%;
  max-width: 200px;
  background-color: ${theme.color.secondary};
`;

const ProfileWrapper = styled.div`
  background-color: green;
  padding: 3.5rem 1.5rem;
  font-size: 1rem;
`;

const Profile = styled.div``;

const TabWrapper = styled.div`
  background-color: lime;
`;

const Tab = styled.div`
  cursor: pointer;
  background-color: brown;
  padding: 2rem 1.5rem;
  ${({ isClicked }) =>
    isClicked &&
    `background-color: red; !important;
    border-left: 5px solid lime;
`}
  &:hover {
    background-color: red;
    border-left: 5px solid lime;
    transition: all 0.3s ease 0s;
  }
`;

export default React.memo(SideNavbar);
