import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setError } from "../../state/slices/user.slice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { signup } from "../../state/thunks/user.thunk";

function Register() {
  const dispatch = useTypedDispatch();

  const { error, loading } = useTypedSelector((state) => state.user);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPass, setShowPass] = useState(false);

  const [showPass2, setShowPass2] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      setError("Password doesn't match.");
      return;
    }

    dispatch(
      signup({
        email: form.email,
        password: form.password,
        username: form.username,
      })
    );
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
            minLength={6}
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

        {/* {error && <div className="formError">{error}</div>} */}
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
