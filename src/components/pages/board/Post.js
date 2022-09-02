import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../../layout/layout";

export default function Post() {
  const navigate = useNavigate();
  const params = useParams();
  const [postData, setPostData] = useState({
    postId: null,
    postTitle: "",
    postContents: "",
    postViews: null,
    postDisplay: null,
  });

  useEffect(() => {
    const getPostData = async () => {
      const fetchedPostData = await (
        await axios.get(`/board/${params.postId}`)
      ).data.data;

      setPostData({
        postId: fetchedPostData.post_id,
        postTitle: fetchedPostData.post_title,
        postContents: fetchedPostData.post_contents,
        postViews: fetchedPostData.post_views,
        postDisplay: fetchedPostData.post_display,
      });
    };

    getPostData();
  }, [params.postId]);

  return (
    <Layout>
      <div>{postData.postTitle}</div>
      <div>{postData.postContents}</div>
      <div>{postData.postViews}</div>
      <div>{postData.postDisplay}</div>
    </Layout>
  );
}
