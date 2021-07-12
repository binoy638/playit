import React from "react";
import Page from "../components/extra/PageMain";
import FriendList from "../components/friends/FriendList";
import FriendRequest from "../components/friends/FriendRequest";

const Friends = () => {
  const options = [
    { title: "Your Friends", component: <FriendList /> },
    { title: "Friend Requests", component: <FriendRequest /> },
  ];
  return (
    <>
      <Page heading="Friends" options={options} />
    </>
  );
};

export default Friends;
