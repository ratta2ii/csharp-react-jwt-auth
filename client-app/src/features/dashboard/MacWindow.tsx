import React from "react";
import DashboardContent from "./DashboardContent";
import "./MacWindowStyles.css";

const YosemiteWindow = () => {
  const handleUserWarningMessage = () => {
    alert(
      "IMPORTANT: This window is for design purposes only. It does not work as a functioning window.\n\nThank you!"
    );
  };

  return (
    <div className="window">
      <div className="titlebar">
        {/* Mac buttons */}
        <div className="buttons" onClick={handleUserWarningMessage}>
          <div className="close">
            <button className="closebutton">x</button>
          </div>
          <div className="minimize">
            <button className="minimizebutton">&ndash;</button>
          </div>
          <div className="zoom">
            <button className="zoombutton">+</button>
          </div>
        </div>
        {/* window title */}
        User Profile (Mock Window)
      </div>
      <div className="content">
        {/* window content */}
        <DashboardContent />
      </div>
    </div>
  );
};

export default YosemiteWindow;
