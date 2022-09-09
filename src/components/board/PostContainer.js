import styled from "styled-components/macro";
import { theme } from "../../styles/theme";

export default function PostContainer({
  postId,
  postTitle,
  postContents,
  postRegisterDate,
  postRegisterUserName,
  handleClick,
}) {
  return (
    <PostWrapper onClick={handleClick}>
      <PostId>{postId}</PostId>
      <PostTitle>{postTitle}</PostTitle>
      <PostContents>{postContents}</PostContents>
      <PostRegisterInfoWrapper>
        <PostRegisterUserName>
          posted by {postRegisterUserName}
        </PostRegisterUserName>
        <PostRegisterDate>{postRegisterDate}</PostRegisterDate>
      </PostRegisterInfoWrapper>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  background: ${theme.color.lightPurple};
  border-radius: 30px;
  padding: 2rem;
  margin: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${theme.color.primary};
    color: ${theme.color.white};
  }
`;

const PostId = styled.div`
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const PostTitle = styled.div`
  font-size: 1.6rem;
`;

const PostContents = styled.div`
  font-size: 1.35rem;
  margin-bottom: 0.2rem;
`;

const PostRegisterInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostRegisterDate = styled.div`
  font-size: 0.75rem;
`;

const PostRegisterUserName = styled.div`
  font-size: 0.9rem;
`;
