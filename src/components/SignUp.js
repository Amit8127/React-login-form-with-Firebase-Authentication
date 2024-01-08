import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const validateName = () => {
    setIsNameValid(name.length >= 1);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setIsPasswordValid(password.length >= 8);
  };

  const validateConfirmPassword = () => {
    setIsConfirmPasswordValid(confirmPassword === password);
  };

  const handleSubmit = () => {

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      var allInputs = document.querySelectorAll("input");
      allInputs.forEach((singleInput) => (singleInput.value = ""));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword(null);

      setIsNameValid(false);
      setIsEmailValid(false);
      setIsPasswordValid(false);
      setIsConfirmPasswordValid(false);

      setSubmitted(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async(res) => {
          setSubmitted(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: name,
          });
          navigate("/");
        })
        .catch((error) => {
          setSubmitted(false);
          console.log("Error-", error);
          alert("Error" + error.message);
        });
    }
  };
  return (
    <div className="row justify-content-center pt-5">
      <h2 className="text-center">SignUp Page</h2>
      <div className=" card col-sm-6">
        <div className="mb-3 mt-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
            style={{
              border: isNameValid ? "2px solid green" : "2px solid red",
            }}
            name="name"
          />
        </div>
        <div className="mb-3">
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
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            style={{
              border: isPasswordValid ? "2px solid green" : "2px solid red",
            }}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword}
            style={{
              border: isConfirmPasswordValid
                ? "2px solid green"
                : "2px solid red",
            }}
            name="confirm password"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted}
          className="btn btn-outline-primary mb-3"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default SignUp;
