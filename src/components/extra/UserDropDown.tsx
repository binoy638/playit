import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout, setShowAuthType } from "../../state/slices/user.slice";

interface UserDropDownProps {
  status: "loggedIn" | "loggedOut";
  setDropDown: (dropDown: boolean) => void;
}

function UserDropDown({ status, setDropDown }: UserDropDownProps) {
  // const history = useHistory();
  const dispatch = useTypedDispatch();
  if (status === "loggedIn") {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <li>Favourites</li>
          <li>Playlists</li>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <li onClick={() => dispatch(logout())}>Log Out</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="userDropDown">
        <ul onClick={() => setDropDown(false)}>
          <li onClick={() => dispatch(setShowAuthType("login"))}>Log In</li>
          <li onClick={() => dispatch(setShowAuthType("signup"))}>Sign Up</li>
        </ul>
      </div>
    );
  }
}

export default UserDropDown;
