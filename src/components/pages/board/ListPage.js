import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../../layout/layout";

export default function ListPage() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  const getPostsData = async () => {
    const fetchedPostsData = await (await axios.get(`/board/list`)).data.data;

    setPostsData(fetchedPostsData);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const moveToPost = (postId) => {
    navigate(`/board/${postId}`);
  };

  return (
    <Layout>
      {postsData &&
        postsData.map((data) => (
          <div key={data.post_id} onClick={() => moveToPost(data.post_id)}>
            {data.post_title}
          </div>
        ))}
    </Layout>
  );
}
