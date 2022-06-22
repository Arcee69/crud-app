import React from 'react'
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("portal-root");


const Modal = ({
    children,
    isOpen,
    modalWidth,
    modalHeight ,
    className
  }) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
      <div className={`fixed w-full h-full z-40 top-0 left-0 flex justify-center items-center ${className}`}>
        <div
          className="bg-white flex items-center justify-center"
          style={{ borderRadius: 10, width: modalWidth, height: modalHeight }}
        >
          {children}{" "}
        </div>
      </div>,
      portalRoot
    );
  };

export default Modal