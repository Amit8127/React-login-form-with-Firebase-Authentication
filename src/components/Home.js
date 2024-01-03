import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="row justify-content-center pt-5">
        <h2 className="text-center">
          Home Page
        </h2>
      <div className=" card col-sm-6 pt-3">
        <Link to="/login" className="btn btn-primary mb-3">
          LogIn
        </Link>
        <Link to="/signup" className="btn btn-primary mb-3">
          SignUp
        </Link>
        <h2 className="text-center">
          {props.name ? `welcome - ${props.name}` : "Login Please!!"}
        </h2>
      </div>
    </div>
  );
};

export default Home;
