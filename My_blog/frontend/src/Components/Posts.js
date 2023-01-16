import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

function Posts(props) {
  const [postList, setPostList] = useState([]);


  const click = () => {
    axios({
      url: "/user/allposts",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        debugger;
        setPostList(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  console.log(postList);



  return (
    <div> Hello
      <button onClick={click}>click</button>
      {postList && (
        <div>
          {postList.map((post, index) => {
              <div key={index}>
                <Post post = {post} index={index}/>
              </div>
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;
