import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { searchFriend } from "../../actions";
import AddFriendCard from "../extra/AddFriendCard";

const FriendList = () => {
  const [query, setUserQuery] = useState("");
  const { findUserResult } = useSelector((state) => state.user);

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
  }, [query]);

  return (
    <div>
      <div className="search-friends">
        <div className="user-search-container">
          <input
            type="text"
            placeholder="Search to Add Friends"
            onChange={(e) => setUserQuery(e.target.value)}
          />
          {findUserResult && <AddFriendCard {...findUserResult} />}
        </div>
      </div>
      <div className="friend-list">TODO: Display friend list</div>
    </div>
  );
};

export default FriendList;
