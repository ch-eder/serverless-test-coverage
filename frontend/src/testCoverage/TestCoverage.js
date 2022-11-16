import { useState, useEffect } from "react";

import "./TestCoverage.css";

import CallGraph from "./callGraph/CallGraph";
import CoverageCriteria from "./coverageCriteria/CoverageCriteria";

import { mergeTraceDataInGraph } from "./Mapping";
import { enumerateEdgesBetweenNodes } from "../util/graphUtils";

import graph from "../data/architecture.json";
import rawTraceData from "../data/tracingData.txt";

/**
 * React component encapsulating the TestCoverage section of the application.
 */
const TestCoverage = () => {
  const [loaded, setLoaded] = useState(false);

  enumerateEdgesBetweenNodes(graph);

  useEffect(() => {
    setLoaded(false);
    fetch(rawTraceData)
      .then((rawTraceData) => rawTraceData.text())
      .then((traceData) => {
        graph.links.forEach((link) => {
          delete link.traceDetails;
          delete link.visited;
          delete link.source.visited;
          delete link.target.visited;
        });
        graph.nodes.map((node) => delete node.visited);
        mergeTraceDataInGraph(traceData, graph);
        setLoaded(true);
      });
  }, []);

  // wait for data to be loaded and merged into the call graph
  if (!loaded) {
    return;
  }

  return (
    <main>
      <div className="topbar">
        Scope Application
        <span id="reset" className="featureTop button" onClick={reset}>
          Reset
        </span>
      </div>
      <CallGraph graph={graph} />
      <CoverageCriteria graph={graph} />
    </main>
  );
};

/**
 * Resets the trace data of the call graph by invoking the deleting of the stored trace data.
 */
function reset() {
  fetch("/tracedata", {
    method: "delete",
    mode: "cors",
  });
}

export default TestCoverage;
