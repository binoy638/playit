import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logout, setShowAuth } from "../../actions";

function UserDropDown({ status, setDropDown }) {
  const history = useHistory();
  const dispatch = useDispatch();
  if (status === "loggedIn") {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <li>Favourites</li>
          <li>Playlists</li>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <li onClick={() => dispatch(logout(history))}>Log Out</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <li onClick={() => dispatch(setShowAuth("login"))}>Log In</li>
          <li onClick={() => dispatch(setShowAuth("signup"))}>Sign Up</li>
        </ul>
      </div>
    );
  }
}

export default UserDropDown;
