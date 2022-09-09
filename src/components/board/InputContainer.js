import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function InputContainer({ name, setData, placeholder }) {
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <InputWrapper>
      제목
      <Input
        name={name}
        onChange={(e) => handleInputChange(e)}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${theme.color.lightGrey};
  border-radius: 45px;
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 85%;
  border: none;
`;
