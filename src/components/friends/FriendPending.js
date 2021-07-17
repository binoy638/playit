import React from "react";
import { useSelector } from "react-redux";
import { FriendCard } from "../extra/cards";

const FriendPending = () => {
  const { friendsPen } = useSelector((state) => state.user);

  return (
    <div className="friend-list-cards">
      {friendsPen.length > 0 &&
        friendsPen.map((friend, index) => (
          <FriendCard key={index} {...friend.user} type="pendings" />
        ))}
    </div>
  );
};

export default FriendPending;
