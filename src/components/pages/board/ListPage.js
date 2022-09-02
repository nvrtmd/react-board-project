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
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Contents</th>
            <th>Views</th>
            <th>Date</th>
            <th>Writer</th>
          </tr>
        </thead>
        <tbody>
          {postsData &&
            postsData
              .filter((data) => data.post_display)
              .map((data) => (
                <tr key={data.post_id} onClick={() => moveToPost(data.post_id)}>
                  <td>{data.post_id}</td>
                  <td>{data.post_title}</td>
                  <td>{data.post_contents.substr(0, 5) + "..."}</td>
                  <td>{data.post_views}</td>
                  <td>{data.post_register_date}</td>
                  <td>{data.post_register_user_name}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </Layout>
  );
}
