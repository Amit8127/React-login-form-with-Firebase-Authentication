import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Home = (props) => {
  const handleLogout = async () => {
    try {
      
      await signOut(auth);
    } catch (error) {
      alert("Error logging out", error);
    }
  };

  return (
    <div className="row justify-content-center pt-5">
      <h2 className="text-center">Home Page</h2>
      <div className=" card col-sm-6 pt-3">
        <Link to="/login" className="btn btn-primary mb-3">
          LogIn
        </Link>
        {props.name ? (
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-primary"
          >
            LogOut
          </button>
        ) : (
          <Link to="/signup" className="btn btn-primary mb-3">
            SignUp
          </Link>
        )}

        {props.name ? (
          <h5 className="text-center mt-2 text-success">
            Welcome {props.name} you have Successfully Logged In
          </h5>
        ) : (
          <h5 className="text-center mt-2 text-danger">"Login Please!!"</h5>
        )}
      </div>
    </div>
  );
};

export default Home;
