import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";

function UserDropDown({ status, setDropDown }) {
  const dispatch = useDispatch();
  if (status === "loggedIn") {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <li>Favourites</li>
          <li>Playlists</li>
          <li>Profile</li>
          <li onClick={() => dispatch(logout())}>Log Out</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <Link to="/login">
            <li>Log In</li>
          </Link>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default UserDropDown;
