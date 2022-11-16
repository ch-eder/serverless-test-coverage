import {
  getAttribute,
  isRequestToSingleDatabase,
  isBatchWrite,
  isHttpRequest,
  getVariableFromDbStatement,
} from "../util/spanUtils";
import { markNodeVisited, markEdgeVisited } from "../util/graphUtils";
import { flattenArray } from "../util/utils";

/**
 * Merges the given trace data into the specified graph.
 * @param {Object} traceData - data which is merged into the graph.
 * @param {Object} graph - graph in which trace data is to be merged..
 */
export function mergeTraceDataInGraph(traceData, graph) {
  traceData
    .split("\n")
    .filter((data) => data)
    .forEach(function (trace) {
      try {
        const resourceSpan = JSON.parse(trace).resourceSpans[0];
        const resourceName = getAttribute(resourceSpan.resource, "faas.name");
        const scopeSpans = resourceSpan.scopeSpans.map((scopeSpan) =>
          flattenArray(scopeSpan.spans)
        );

        markNodeVisited(graph, resourceName);

        // mark nodes and edges of called resources visited
        scopeSpans.forEach((spans) => {
          spans.forEach((span) => {
            if (getAttribute(span, "http.status_code") < 400) {
              if (isRequestToSingleDatabase(span)) {
                mergeSingleDatabaseCall(resourceName, span, graph);
              } else if (isBatchWrite(span)) {
                mergeBatchWrite(resourceName, span, graph);
              } else if (isHttpRequest(span)) {
                mergeHttpRequest(resourceName, span, graph);
              }
              // further operations, such as "invoke" can be added here
            }
          });
        });
      } catch (err) {
        console.warn("An error occurred during parsing trace data: ", err);
      }
    });
}

/**
 * Merges a given, single database call into the specified graph.
 * @param {Object} currentResource - caller resource of the database request.
 * @param {Object} span - telemetry span containing information about the database call.
 * @param {Object} graph - graph in which trace data is to be merged.
 */
function mergeSingleDatabaseCall(currentResource, span, graph) {
  const dbName = getAttribute(span, "db.name");
  const dbOperation = getAttribute(span, "db.operation");
  const dbStatement = JSON.parse(getAttribute(span, "db.statement"));
  const variable = { resourceName: dbStatement.TableName };

  if (dbOperation === "Scan") {
    Object.assign(variable, { variableName: "all" });
  } else {
    Object.assign(variable, {
      variableName: getVariableFromDbStatement(dbStatement),
    });
  }

  markNodeVisited(graph, dbName);
  markEdgeVisited(graph, currentResource, dbName, dbOperation, span, variable);
}

/**
 * Merges a batchWrite database call, incorporating multiple database calls, into the specified graph.
 * The calls of the batchWrite are added individually to the graph.
 * A distinction is made between DeleteRequests and PutRequests.
 * @param {Object} currentResource - caller resource of the database request.
 * @param {Object} span - telemetry span containing information about the database calls.
 * @param {Object} graph - graph in which trace data is to be merged.
 */
function mergeBatchWrite(currentResource, span, graph) {
  const dbStatement = JSON.parse(getAttribute(span, "db.statement"));

  for (const dbName of Object.keys(dbStatement.RequestItems)) {
    markNodeVisited(graph, dbName);

    for (const element of dbStatement.RequestItems[dbName]) {
      const request = Object.keys(element)[0];
      const dbOperation =
        request === "DeleteRequest"
          ? "DeleteItem"
          : request === "PutRequest"
          ? "PutItem"
          : null;
      if (request === null) continue;

      const variable = {
        resourceName: dbName,
        variableName: getVariableFromDbStatement(element[request]),
      };

      markEdgeVisited(
        graph,
        currentResource,
        dbName,
        dbOperation,
        span,
        variable
      );
    }
  }
}

/**
 * Merges a given HTTP call into the specified graph.
 * @param {Object} currentResource - caller resource of the HTTP request.
 * @param {Object} span - telemetry span containing information about the HTTP call.
 * @param {Object} graph - graph in which trace data is to be merged.
 */
function mergeHttpRequest(currentResource, span, graph) {
  const peerName = getAttribute(span, "net.peer.name");
  const httpMethod = getAttribute(span, "http.method");

  markNodeVisited(graph, peerName);
  markEdgeVisited(graph, currentResource, peerName, httpMethod, span);
}
