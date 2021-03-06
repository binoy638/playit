import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerRequest } from "../../api/publicRequests";
import { setShowAuth } from "../../actions";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

function Register() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [showPass2, setShowPass2] = useState(false);

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        return dispatch(setShowAuth("login"));
      }

      if (response?.data) {
        setLoading(false);
        return setFormError(response.data);
      }
    } catch (error) {
      if (!error.response) {
        setLoading(false);
        return setFormError("Something went wrong please try again later");
      }
      try {
        setFormError(error.response.data);
      } catch (error) {
        setFormError("Something went wrong please try again later");
      }
      setLoading(false);
    }
  };

  return (
    <div className="authForm">
      <div className="header">
        <h3>Join Playit today</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <p>Username</p>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        <div className="inputContainer">
          <p>Email</p>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="inputContainer">
          <p>Password</p>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            onChange={handleChange}
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
          <p>Confirm Password</p>
          <input
            type={showPass2 ? "text" : "password"}
            name="password2"
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
        <small>
          By clicking Sign Up, you are indicating that you have read and
          acknowledge the Terms of Service and Privacy Notice.
        </small>
        <button
          type="submit"
          disabled={
            !form.username || !form.email || !form.password || !form.password2
          }
        >
          {loading ? (
            <Loader type="ThreeDots" color="#00BFFF" height={40} width={40} />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;
