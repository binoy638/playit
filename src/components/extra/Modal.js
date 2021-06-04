import React from "react";
import { useDispatch } from "react-redux";
import { setShowAuth } from "../../actions";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

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
