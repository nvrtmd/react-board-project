import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import axios from "axios";
import { Layout } from "../../../layout/layout";
import { Button } from "../../global/Button";
import { InputContainer } from "../../board/InputContainer";
import { TextInputContainer } from "../../board/TextInputContainer";
import { ButtonWrapper } from "./ListPage";
import { SelectContainer } from "../../board/SelectContainer";
import {
  PAGES_TITLES,
  POST_DISPLAY_SELECT_OPTIONS,
  BUTTONS_TEXT,
  INPUT_PLACEHOLDERS,
} from "../../../constants";

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
      <PageTitle>{PAGES_TITLES.CREATE_POST}</PageTitle>
      <PostCreateFormWrapper>
        <PostCreateForm>
          <PostTitleWrapper>
            <InputContainer
              title="Title"
              type="text"
              placeholder={INPUT_PLACEHOLDERS.WRITE_TITLE}
              name="postTitle"
              handleChange={handleInputChange}
            />
          </PostTitleWrapper>
          <PostContentsWrapper>
            <TextInputContainer
              placeholder={INPUT_PLACEHOLDERS.WRITE_CONTENTS}
              type="text"
              name="postContents"
              handleChange={handleInputChange}
            />
          </PostContentsWrapper>
          <SelectWrapper>
            <SelectContainer
              optionList={POST_DISPLAY_SELECT_OPTIONS}
              name="postDisplay"
              handleChange={handleInputChange}
            />
          </SelectWrapper>
        </PostCreateForm>
      </PostCreateFormWrapper>

      <ButtonWrapper>
        <Button
          handleClick={handleCreateButtonClick}
          buttonName={BUTTONS_TEXT.WRITE}
        />
        <Button
          handleClick={() => navigate("/board/list")}
          buttonName={BUTTONS_TEXT.CANCEL}
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
