import styled from "styled-components/macro";
import { theme } from "../styles/theme";
import Header from "./header";
import SideNavbar, { MemoizedSideNavbar } from "./sideNavbar";

const Layout = (props) => (
  <Container>
    <MemoizedSideNavbar />
    <Wrapper>
      <Header />
      <Main>{props.children}</Main>
    </Wrapper>
  </Container>
);

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
