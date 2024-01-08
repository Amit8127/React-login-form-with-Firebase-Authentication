import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
function App() {

  const [userName, setUserName] = useState("");

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(user.displayName);
      } else{
        setUserName("");
      }
    })
  })
  return (
    <div >
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="logIn">
                LogIn
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home name={userName}/>} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
