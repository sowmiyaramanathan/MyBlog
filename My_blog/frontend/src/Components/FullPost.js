import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function FullPost(props) {
  const {post_id} = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log("HRI")
    axios({
        url: "/user/post/" + post_id,
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data
        setPost(data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  });

  return (
    <div> Hi
      {/* <div className="title">
        <h1>Hello{post.blogTitle}</h1>
      </div>

      <div className="postTextContainer">{post.blogContent}</div>
      <h3>@{post.userName}</h3>
      <h3>@{post.dateTime}</h3> */}
    </div>
  );
}

export default FullPost;
