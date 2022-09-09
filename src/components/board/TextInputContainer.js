import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function TextInputContainer({ name, setData, placeholder }) {
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <TextInputWrapper>
      <TextInput
        name={name}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </TextInputWrapper>
  );
}
const TextInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.lightGrey};
  border-radius: 3rem;
  height: 100%;
`;

const TextInput = styled.textarea`
  outline: none;
  resize: none;
  background: none;
  border: none;
  width: 90%;
  font-size: 1.2rem;
  font-family: GmarketSansMedium;

  height: 85%;
  ::-webkit-scrollbar {
    width: 5.2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;
