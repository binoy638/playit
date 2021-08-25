import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsDashCircleFill } from "react-icons/bs";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CLEAR_ERROR } from "../../redux/actions/types";

function Login() {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ERROR });
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="authForm">
      <div className="header">
        <h3>Log in to Playit</h3>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error">
            <div className="icon">
              <BsDashCircleFill size="1.5rem" />
            </div>
            <div className="text">
              <p> {error}</p>

              <p>
                <Link>
                  <small>Forgot Password?</small>
                </Link>
              </p>
            </div>
          </div>
        )}
        <div className="inputContainer">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputContainer">
          <p>Password</p>
          <input
            type={showPass ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPass ? (
            <AiOutlineEyeInvisible
              className="showIcon"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <AiOutlineEye
              className="showIcon"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        <Link>
          <small>Trouble logging in?</small>
        </Link>

        <button disabled={!email || !password || loading} type="submit">
          {loading ? (
            <Loader type="ThreeDots" color="#00BFFF" height={40} width={40} />
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
