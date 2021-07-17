import React from "react";
import Page from "../components/extra/PageMain";
import FriendList from "../components/friends/FriendList";
import FriendPending from "../components/friends/FriendPending";
import FriendRequest from "../components/friends/FriendRequest";

const Friends = () => {
  const options = [
    { title: "Your Friends", component: <FriendList /> },
    { title: "Friend Requests", component: <FriendRequest /> },
    { title: "Pending Requests", component: <FriendPending /> },
  ];
  return (
    <>
      <Page heading="Friends" options={options} />
    </>
  );
};

export default Friends;
