import React from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { theme } from "../styles/theme";
import { SIDE_NAVBAR_TAB_TEXT } from "../constants";

export const SideNavbar = React.memo(function SideNavbar({
  isSignedin,
  signedinUserName,
}) {
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
          <Profile onClick={() => navigate("/user/profile")}>
            {SIDE_NAVBAR_TAB_TEXT.PROFILE_TAB.IS_NOT_SIGNED_IN} <br />
            {signedinUserName}!
          </Profile>
        ) : (
          <Profile onClick={() => navigate("/user/signin")}>
            {SIDE_NAVBAR_TAB_TEXT.PROFILE_TAB.IS_SIGNED_IN}
          </Profile>
        )}
      </ProfileWrapper>
      <TabWrapper>
        <Tab
          isClicked={isClicked("board")}
          onClick={() => navigate("/board/list")}
        >
          {SIDE_NAVBAR_TAB_TEXT.BOARD_TAB}
        </Tab>
        {signedinUserName === "admin" && (
          <UserDashboardTab
            isClicked={isClicked("user")}
            onClick={() => navigate("/admin/userlist")}
          >
            {SIDE_NAVBAR_TAB_TEXT.USER_DASHBOARD_TAB}
          </UserDashboardTab>
        )}
      </TabWrapper>
    </SideNavbarWrapper>
  );
});

const SideNavbarWrapper = styled.div`
  width: 23%;
  max-width: 200px;
  background-color: ${theme.color.tertiary};
`;

const ProfileWrapper = styled.div`
  background-color: ${theme.color.primary};
  color: ${theme.color.black};
  padding: 3.5rem 1.5rem;
  font-size: 1rem;
`;

const Profile = styled.div`
  cursor: pointer;
`;

const TabWrapper = styled.div`
  font-size: 1.2rem;
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 2rem 1.5rem;
  ${({ isClicked }) =>
    isClicked &&
    `background-color: ${theme.color.secondary}; !important;
    border-left: 5px solid ${theme.color.primary};
`}
  &:hover {
    background-color: ${theme.color.secondary};
    border-left: 5px solid ${theme.color.primary};
    transition: all 0.3s ease 0s;
  }
`;

const UserDashboardTab = styled(Tab)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
