import { NavLink } from "react-router-dom";

import "./Sidebar.css";

/**
 * React component encapsulating the Sidebar of the application.
 */
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div id="sidebarHeading">ServerlessTC</div>
      <div id="sidebarContent">
        <div className="sidebarElement">
          <NavLink id="testCases" activeClassName="selected" to="/testCases">
            Test Cases
          </NavLink>
        </div>
        <div className="sidebarElement">
          <NavLink
            id="testCoverage"
            activeClassName="selected"
            to="/testCoverage"
          >
            Test Coverage
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
