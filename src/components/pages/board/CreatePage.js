import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import { Layout } from "../../../layout/layout";
import { theme } from "../../../styles/theme";
import { Button } from "../../global/Button";
import { InputContainer } from "../../board/InputContainer";
import { TextInputContainer } from "../../board/TextInputContainer";
import { ButtonWrapper } from "./ListPage";
import { SelectContainer } from "../../board/SelectContainer";

export function CreatePage() {
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
              type="text"
              placeholder="Write title"
              name="postTitle"
              handleChange={handleInputChange}
            />
          </PostTitleWrapper>
          <PostContentsWrapper>
            <TextInputContainer
              placeholder="Write Contents"
              type="text"
              name="postContents"
              handleChange={handleInputChange}
            />
          </PostContentsWrapper>
          <SelectWrapper>
            <SelectContainer
              optionList={[
                { name: "게시함", value: true },
                { name: "게시 안함", value: false },
              ]}
              name="postDisplay"
              handleChange={handleInputChange}
            />
          </SelectWrapper>
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

const SelectWrapper = styled.div`
  height: 4.5rem;
  width: 10rem;
`;
