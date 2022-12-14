import React, { useEffect, useState, memo } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { theme } from "../styles/theme";
import { Header } from "./header";
import { SideNavbar } from "./sideNavbar";

export const Layout = memo((props) => {
  const [isSignedin, setIsSignedin] = useState(false);
  const [signedinUserName, setSignedinUserName] = useState("");

  useEffect(() => {
    const isSignedinUser = async () => {
      try {
        const signedinUserData = await axios.get(`/user/profile`, {
          withCredentials: true,
        });
        setSignedinUserName(signedinUserData.data.data.user_nickname);
        setIsSignedin(true);
      } catch {
        setIsSignedin(false);
      }
    };

    isSignedinUser();
  }, []);

  return (
    <>
      <Header isSignedin={isSignedin} setIsSignedin={setIsSignedin} />
      <Main>
        <SideNavbar
          isSignedin={isSignedin}
          signedinUserName={signedinUserName}
        />
        <Wrapper>{props.children}</Wrapper>
      </Main>
    </>
  );
});

const Main = styled.main`
  display: flex;
  min-height: calc(100vh - ${theme.layout.headerHeight});
`;

const Wrapper = styled.div`
  padding: 3rem 1.5rem;
  width: 100%;
`;
