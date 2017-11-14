import React from "react";
import "./style.css";

const Notification = ({ show, title, message, type }) =>
  !show ? null : (
    <div className={`Notification Notification--${type}`}>
      <h2 className="Notification-title">{title}</h2>
      <p className="Notification-message">{message}</p>
    </div>
  );

export default Notification;
