import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerRequest } from "../api/publicRequests";

function Register() {
  const history = useHistory();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPass, setShowPass] = useState(false);

  const [showPass2, setShowPass2] = useState(false);

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setFormError("Password doesn't match.");
      return;
    }
    try {
      const response = await registerRequest({
        email: form.email,
        password: form.password,
        username: form.username,
      });
      console.log(response);
      if (response.status === 201) {
        return history.push("/login");
      }

      if (response?.data) {
        return setFormError(response.data);
      }
    } catch (error) {
      if (!error.response) {
        return setFormError("Something went wrong please try again later");
      }
      try {
        setFormError(error.response.data);
      } catch (error) {
        setFormError("Something went wrong please try again later");
      }
    }
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            minLength="6"
            required
          />
        </div>
        <div className="inputContainer">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="inputContainer">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {showPass ? (
            <AiOutlineEye
              className="showIcon"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="showIcon"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        <div className="inputContainer">
          <input
            type={showPass2 ? "text" : "password"}
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          {showPass2 ? (
            <AiOutlineEye
              className="showIcon"
              onClick={() => setShowPass2(!showPass2)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="showIcon"
              onClick={() => setShowPass2(!showPass2)}
            />
          )}
        </div>

        {formError && <div className="formError">{formError}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
