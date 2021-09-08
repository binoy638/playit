import { useDispatch } from "react-redux";
import { setShowAuthType } from "../../state/slices/user.slice";
import Login from "../auth/Login";
import Register from "../auth/Register";

type ModalProps = {
  type: "login" | "signup" | null;
};

const Modal = ({ type }: ModalProps) => {
  const dispatch = useDispatch();
  return (
    <div className="modal" onClick={() => dispatch(setShowAuthType(null))}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {type === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Modal;
