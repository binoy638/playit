import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  searchFriend,
  addFriendError,
  createSocketConnection,
} from "../../actions";
import { AddFriendCard, FriendCard } from "../extra/cards";

const FriendList = () => {
  const [query, setUserQuery] = useState("");
  const { findUserResult } = useSelector((state) => state.user);

  const { friends, addFriendError: error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const cancelToken = useRef();

  useEffect(() => {
    if (query) {
      if (typeof cancelToken.current != typeof undefined) {
        cancelToken.current.cancel("Canceling the previous req");
      }
      cancelToken.current = axios.CancelToken.source();
      dispatch(searchFriend(query, cancelToken.current));
      // console.log(findUserResult);
    }
  }, [query, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(addFriendError(null));
    }, 10000);
  }, [error, dispatch]);

  return (
    <div className="friends">
      <div className="search-friends">
        <div className="user-search-container">
          <input
            type="text"
            placeholder="Search to Add Friends"
            onChange={(e) => setUserQuery(e.target.value)}
          />
          {findUserResult && <AddFriendCard {...findUserResult} />}
          {error && <small>{error}</small>}
        </div>
      </div>

      <div className="friend-list-cards">
        {friends.length > 0 &&
          friends.map((friend, index) => (
            <FriendCard {...friend.user} isOnline={friend.online} key={index} />
          ))}
      </div>
    </div>
  );
};

export default FriendList;
