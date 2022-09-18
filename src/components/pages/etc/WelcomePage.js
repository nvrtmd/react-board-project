import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Layout } from "../../../layout/layout";
import WelcomeImg from "../../../assets/welcome_image.png";
import { WELCOME_TEXT } from "../../../constants";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <WelcomeWrapper>
        <WelcomeImage
          alt=""
          src={WelcomeImg}
          onClick={() => navigate("/user/signin")}
        />
        <WelcomeTitle>{WELCOME_TEXT.WELCOME_TITLE}</WelcomeTitle>
        <WelcomeSubtitle>{WELCOME_TEXT.WELCOME_SUBTITLE}</WelcomeSubtitle>
      </WelcomeWrapper>
    </Layout>
  );
}

const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: grid;
  place-content: center;
`;

const WelcomeImage = styled.img`
  width: 55%;
  border-radius: 30px;
  margin: auto;
  display: block;
  cursor: pointer;
`;

const WelcomeTitle = styled.div`
  margin-top: 25px;
  font-weight: 700;
`;
const WelcomeSubtitle = styled.div``;
