import React from "react";
import "./Toggle.css";

const Toggle = () => {
  return (
    <div>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;
