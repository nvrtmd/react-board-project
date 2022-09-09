import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import Layout from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import Button from "../../global/Button";
import InputContainer from "../../board/InputContainer";
import TextInputContainer from "../../board/TextInputContainer";

export default function CreatePage() {
  const navigate = useNavigate();
  const [newPostData, setNewPostData] = useState({
    postTitle: "",
    postContents: "",
    postDisplay: "true",
    postRegisterUserName: "",
  });

  useEffect(() => {
    const isSignedinUser = async () => {
      try {
        const userData = await axios.get(`/user/profile`, {
          withCredentials: true,
        });

        setNewPostData((prev) => ({
          ...prev,
          postRegisterUserName: userData.data.data.user_nickname,
        }));
      } catch {
        navigate("/user/signin");
      }
    };

    isSignedinUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateButtonClick = async () => {
    setNewPostData((prev) => ({
      ...prev,
      postDisplay: prev.postDisplay === "true" ? 1 : 0,
    }));
    await axios.post(`/board/create`, newPostData, { withCredentials: true });
    navigate(`/board/list`);
  };

  return (
    <Layout>
      <PageTitle>CREATE POST</PageTitle>
      <PostCreateFormWrapper>
        <PostCreateForm>
          <PostTitleWrapper>
            <InputContainer
              title="Title"
              placeholder="Write title"
              name="postTitle"
              setData={setNewPostData}
            />
          </PostTitleWrapper>
          <PostContentsWrapper>
            <TextInputContainer
              placeholder="Write Contents"
              name="postContents"
              setData={setNewPostData}
            />
          </PostContentsWrapper>
          <div>
            <select
              id="postDisplay"
              name="postDisplay"
              onChange={handleInputChange}
            >
              <option value={true}>게시함</option>
              <option value={false}>게시안함</option>
            </select>
          </div>
        </PostCreateForm>
      </PostCreateFormWrapper>

      <ButtonWrapper>
        <Button handleClick={handleCreateButtonClick} buttonName="Write" />
        <Button
          handleClick={() => navigate("/board/list")}
          buttonName="Cancel"
        />
      </ButtonWrapper>
    </Layout>
  );
}

const PageTitle = styled.div`
  text-align: center;
`;

const PostCreateFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const PostCreateForm = styled.div`
  width: 100%;
`;

const PostTitleWrapper = styled.div`
  height: 4.5rem;
  margin-bottom: 1rem;
`;

const PostContentsWrapper = styled.div`
  height: 25rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  margin: 0 auto;
`;
