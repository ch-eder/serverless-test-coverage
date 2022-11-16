import React, { useEffect } from "react";

import "./CallGraph.css";

import { drawD3Graph } from "./drawD3Graph";

/**
 * React component encapsulating the CallGraph section of the application.
 */
const CallGraph = ({ graph }) => {
  useEffect(() => {
    drawD3Graph(graph);
  });

  return (
    <div className="contentBox">
      <div id="graphHeading" className="leftAlign">
        Call Graph
      </div>
      <svg />
    </div>
  );
};

export default CallGraph;
