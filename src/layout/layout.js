import styled from "styled-components/macro";
import { theme } from "../styles/theme";

const Layout = (props) => (
  <Wrapper>
    <Main>{props.children}</Main>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Main = styled.main`
  background-color: ${theme.color.secondary};
  width: 90%;
  height: 90%;
  border-radius: 30px;
`;

export default Layout;
