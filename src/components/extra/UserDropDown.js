import React from "react";
import { useDispatch } from "react-redux";
import { logout, setShowAuth } from "../../actions";

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
          <li onClick={() => dispatch(setShowAuth("login"))}>Log In</li>
          <li onClick={() => dispatch(setShowAuth("signup"))}>Sign Up</li>
        </ul>
      </div>
    );
  }
}

export default UserDropDown;
