import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { theme } from "../styles/theme";
import Header from "./header";
import SideNavbar from "./sideNavbar";

const Layout = (props) => {
  const [isSignedin, setIsSignedin] = useState(false);

  useEffect(() => {
    const isSignedinUser = async () => {
      try {
        await axios.get(`/user/profile`, {
          withCredentials: true,
        });
        setIsSignedin(true);
      } catch {
        setIsSignedin(false);
      }
    };

    isSignedinUser();
  }, []);

  return (
    <>
      <Header isSignedin={isSignedin} />
      <Main>
        <SideNavbar />
        <Wrapper>{props.children}</Wrapper>
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  min-height: calc(100vh - ${theme.layout.headerHeight});
`;

const Wrapper = styled.div`
  padding: 3rem 0.5rem;
`;

export default Layout;
