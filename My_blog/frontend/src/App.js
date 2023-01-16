import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import MainPage from "./Components/MainPage";
import SignupPage from "./Components/SignupPage";
import SigninPage from "./Components/SigninPage";
import HomePage from "./Components/HomePage";
import useToken from "./token/useToken";
import CreatePost from "./Components/CreatePost";
import FullPost from "./Components/FullPost";

function App() {
  const { token, removeToken, setToken } = useToken();


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage setToken={setToken} />} />
        <Route
          path="/user/homepage"
          element={
            token ?
              <HomePage removetoken={removeToken} token={token} />
             : <Navigate to="/signin" replace/>}
        />
        <Route
          path="/user/createBlogPost" 
          element={token ? <CreatePost token={token} /> : <Navigate to="/signin" replace/>}
        />
        <Route
          path="/user/post/:post_id"
          element={token ? <FullPost token={token} /> : <Navigate to="/signin" replace/>}
        />
      </Routes>
    </div>
  );
}

export default App;
