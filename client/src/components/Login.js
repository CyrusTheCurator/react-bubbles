import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState("");

  const handleChange = (e, setter) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        console.log("Login successful", res);
        localStorage.setItem("token", res.data.payload);
        console.log("we are currently setting the token to ", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  };

  return (
    <form className="loginForm" onSubmit={login}>
      If you like bubbles, go ahead and log in.
      <br />
      <br />
      Username <br />
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      Password <br />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <br />
      <div className="buttonsContainer">
        <Button type="submit" variant="dark">
          Log in
        </Button>
      </div>
    </form>
  );
};

export default Login;
