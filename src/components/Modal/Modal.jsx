import React from "react";

const Modal = ({ children, openModal, setOpenModal }) => {
  return (
    <div
      id="modal-wrapper"
      onClick={(e) => {
        if (e.target.id === "modal-wrapper") {
          setOpenModal(false);
        }
      }}
      className={`fixed inset-0 bg-[#000]/50 backdrop-blur flex items-center justify-center z-10 ${
        openModal ? "scale-1" : "scale-0"
      }`}
    >
      <div className="bg-white p-10 rounded-md shadow-md w-[500px] absolute">
        {children}
      </div>
    </div>
  );
};

export default Modal;
