import styled from "styled-components/macro";
import { theme } from "../styles/theme";
import Header from "./header";

const Layout = (props) => (
  <Container>
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
  background: green;
  height: 100vh;
`;

const Wrapper = styled.div`
  background: red;
  height: 90%;
  width: 90%;
`;

const Main = styled.main`
  background-color: ${theme.color.secondary};
  /* height: 90%; */
  border-radius: 30px;
  padding: 2rem 1rem;
  margin: auto;
`;

export default Layout;
