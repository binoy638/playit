import React, { useState } from "react";
import { login } from "../actions";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, history));
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputContainer">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
        {error && <div className="formError">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
