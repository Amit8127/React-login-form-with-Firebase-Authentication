import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../firebase";

const Login = () => {
  
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
  
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
  
    const [submitted, setSubmitted] = useState(false);
  
    const navigate = useNavigate();
  
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(email));
    };
  
    const validatePassword = () => {
      setIsPasswordValid(password.length >= 8);
    };
  
    const handleSubmit = () => {
  
      if (isEmailValid && isPasswordValid) {
        var allInputs = document.querySelectorAll("input");
        allInputs.forEach((singleInput) => (singleInput.value = ""));
        setEmail("");
        setPassword("");
  
        setIsEmailValid(false);
        setIsPasswordValid(false);
  
        setSubmitted(true);
        signInWithEmailAndPassword(auth, email, password)
          .then(async(res) => {
            setSubmitted(false);
            navigate("/");
          })
          .catch((error) => {
            setSubmitted(false);
            alert("Error-" + error.message);
          });
        }
    };
  return (
    <div className="row justify-content-center pt-5">
        <h2 className="text-center">
          LogIn Page
        </h2>
      <div className=" card col-sm-6">
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            style={{
              border: isEmailValid ? "2px solid green" : "2px solid red",
            }}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            style={{
              border: isPasswordValid ? "2px solid green" : "2px solid red",
            }}
            name="pswd"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted}
          className="btn btn-primary mb-3"
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
