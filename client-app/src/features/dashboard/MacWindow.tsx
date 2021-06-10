import React from "react";
import DashboardContent from "./DashboardContent";
import "./MacWindowStyles.css";

const YosemiteWindow = () => {

  const handleUserWarningMessage = () => {
    alert("IMPORTANT: This window is for design purposes only. It does not work as a functioning window.\n\nThank you!");
  }

  return (
    <div className="window">
      <div className="titlebar">
        <div className="buttons" onClick={handleUserWarningMessage}>
          <div className="close">
            <a className="closebutton" href="#">
              <span>
                <strong>x</strong>
              </span>
            </a>
            {/* <!-- close button link --> */}
          </div>
          <div className="minimize">
            <a className="minimizebutton" href="#">
              <span>
                <strong>&ndash;</strong>
              </span>
            </a>
            {/* <!-- minimize button link --> */}
          </div>
          <div className="zoom">
            <a className="zoombutton" href="#">
              <span>
                <strong>+</strong>
              </span>
            </a>
            {/* <!-- zoom button link --> */}
          </div>
        </div>
            Current User Profile
        {/* <!-- window title --> */}
      </div>
      <div className="content">
        <DashboardContent />
        {/* <!-- window content --> */}
      </div>
    </div>
  );
};

export default YosemiteWindow;
