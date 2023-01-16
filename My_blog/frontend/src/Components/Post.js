import React from "react";
import { useNavigate } from "react-router-dom";

function Post({ post, index }) {

  const navigate = useNavigate()


  function showFullPost (post_id) {
    let path = "/user/post/" + post_id
    navigate(path)
  }


  return (
    <div>
      <div>
        <h2>{post[index].blogTitle}</h2>
      </div>
      <div>
        <p>{post.blogContent.slice(0, 200) + "...."}</p>
        <div>
          <button onClick={() => {showFullPost(post.blogID)}}>Read more</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
