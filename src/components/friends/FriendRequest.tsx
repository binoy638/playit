import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FriendCard } from "../extra/cards";

const FriendRequest = () => {
  const { friendsReq } = useTypedSelector((state) => state.user);

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
