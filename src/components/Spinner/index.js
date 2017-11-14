import React from "react";
import "./style.css";

const Spinner = ({ isSpinning }) =>
  isSpinning ? <div className="Spinner" /> : null;

export default Spinner;
