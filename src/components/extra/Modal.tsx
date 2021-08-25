import React from "react";
import { useDispatch } from "react-redux";
import { setShowAuth } from "../../redux/actions";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Modal = ({ type }) => {
  const dispatch = useDispatch();
  return (
    <div className="modal" onClick={() => dispatch(setShowAuth(null))}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {type === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Modal;
