import React from "react";
import { useDispatch } from "react-redux";
import { addFriend } from "../../actions";

const AddFriendCard = ({ username, image, _id }) => {
  const dispatch = useDispatch();

  return (
    <div className="friend">
      <img src={image ? image : ""} alt={username} />
      <p>{username}</p>
      <button onClick={() => dispatch(addFriend({ userID: _id }))}>Add</button>
    </div>
  );
};

export default AddFriendCard;
