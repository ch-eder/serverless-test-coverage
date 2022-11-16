import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import SidebarComponent from "./sidebar/Sidebar";
import TestCasesComponent from "./testCases/TestCases";
import TestCoverageComponent from "./testCoverage/TestCoverage";

/**
 * React component encapsulating the main application.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebarContainer">
          <SidebarComponent />
        </div>
        <Switch>
          <Route exact path="/testCases">
            <TestCasesComponent />
          </Route>
          <Route exact path="/testCoverage">
            <TestCoverageComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
