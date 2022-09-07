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
    <Container>
      <SideNavbar />
      <Wrapper>
        <Header isSignedin={isSignedin} />
        <Main>{props.children}</Main>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: red;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 90%;
  background-color: grey;
`;

const Main = styled.main`
  background-color: ${theme.color.secondary};
  border-radius: 30px;
  padding: 2rem 1rem;
  margin: auto;
  height: 100%;
`;

export default Layout;
