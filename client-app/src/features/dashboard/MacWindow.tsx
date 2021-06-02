import React from "react";
import DashboardContent from "./DashboardContent";
import "./MacWindowStyles.css";

const YosemiteWindow = () => {
  return (
    <div className="window">
      <div className="titlebar">
        <div className="buttons">
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
        ASP.Net Core w/ React Auth | User Profile
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
