import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <ClickableText onClick={() => navigate("/board/list")}>
          BOARD
        </ClickableText>
        <AuthenticationWrapper>
          <ClickableText onClick={() => navigate("/user/signin")}>
            SIGN IN
          </ClickableText>
          <ClickableText onClick={() => navigate("/user/signup")}>
            SIGN UP
          </ClickableText>
        </AuthenticationWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthenticationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 33%;
`;

const ClickableText = styled.div`
  cursor: pointer;
`;
