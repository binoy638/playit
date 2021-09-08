import { useEffect, useState, useRef } from "react";
import axios, { CancelTokenSource } from "axios";
import { AddFriendCard, FriendCard } from "../extra/cards";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { searchFriend } from "../../state/thunks/user.thunk";

const FriendList = () => {
  const [query, setUserQuery] = useState("");
  const { findUserResult } = useTypedSelector((state) => state.user);

  const { friends, addFriendError: error } = useTypedSelector(
    (state) => state.user
  );

  const dispatch = useTypedDispatch();

  const cancelToken = useRef<CancelTokenSource>();

  useEffect(() => {
    if (query) {
      if (cancelToken.current !== undefined) {
        cancelToken.current.cancel("Canceling the previous req");
      }
      cancelToken.current = axios.CancelToken.source();
      dispatch(searchFriend({ query, cancelToken: cancelToken.current }));
      // console.log(findUserResult);
    }
  }, [query, dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(addFriendError(null));
  //   }, 10000);
  // }, [error, dispatch]);

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
            <FriendCard
              {...friend.user}
              isOnline={friend.online}
              key={index}
              type={"friends"}
            />
          ))}
      </div>
    </div>
  );
};

export default FriendList;
