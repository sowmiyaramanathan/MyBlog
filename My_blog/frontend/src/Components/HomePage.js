import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Posts from "./Posts";
import "../styles/styles.css";

function HomePage(props) {

  const navigate = useNavigate();

  function signOut() {
    axios({
      url: "/user/signout",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        props.removetoken();
        navigate('/signin')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  const [name, setName] = useState(null);

  useEffect(() => {
    console.log(name)
    axios({
      method: "GET",
      url: "/user/details",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        setName(res.name);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }, []);

  return (
    <div>
      <h1 className="welcomeMessage">Welcome {name} </h1>

      <nav className="navBar">
        <ul>
          <li>
            <Link to="/user/homepage">
              <button>Home</button>{" "}
            </Link>
            <Link to="/user/createBlogPost">
              <button>Create Post</button>
            </Link>
            <button onClick={signOut}>Sign out</button>
          </li>
        </ul>
      </nav>

      <div>
        <Posts token={props.token} />
      </div>
    </div>
  );
}

export default HomePage;

// const [profile, setProfile] = useState(null);

//   function getDetails() {
//     axios({
//       method: "GET",
//       url: "/user/details",
//       headers: {
//         Authorization: "Bearer " + props.token,
//       },
//     })
//       .then((response) => {
//         console.log(props.token);
//         const res = response.data;
//         console.log(res);
//         res.token && props.setToken(res.token);
//         setProfile({
//           name: res.name,
//           about: res.about,
//         });
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//         }
//       });
//   }

// <button onClick={getDetails}>Get Details</button>

// {profile && (
//   <div>
//     <p>profile name : {profile.name}</p>
//     <p>about me : {profile.about}</p>
//   </div>
// )}
