import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FriendCard } from "../extra/cards";

const FriendPending = () => {
  const { friendsPen } = useTypedSelector((state) => state.user);

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
