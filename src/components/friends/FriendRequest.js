import React from "react";
import { useSelector } from "react-redux";
import { FriendCard } from "../extra/cards";

const FriendRequest = () => {
  const { friendsReq } = useSelector((state) => state.user);

  return (
    <div className="friend-list-cards">
      {friendsReq.length > 0 &&
        friendsReq.map((friend, index) => (
          <FriendCard {...friend.user} key={index} type="requests" />
        ))}
    </div>
  );
};

export default FriendRequest;
