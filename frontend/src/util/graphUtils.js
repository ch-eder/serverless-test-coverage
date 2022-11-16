import { flattenArray } from "./utils";

/**
 * Enumerates the edges of two identical nodes.
 * @param {Object} graph - graph for which edges are to be enumerated.
 */
export function enumerateEdgesBetweenNodes(graph) {
  graph.links.forEach((data, i) => {
    let sameEdges = graph.links.slice(0, i).filter((link) => {
      return (
        link.source === graph.links[i].source &&
        link.target === graph.links[i].target
      );
    });
    graph.links[i].edgeNumber = sameEdges.length + 1;
  });
}

/**
 * Mark a node visited.
 * @param {String} graph - graph for which node is to be marked visited.
 * @param {String} resourceName - name of the resource which is to be marked visited.
 */
export function markNodeVisited(graph, resourceName) {
  graph.nodes.find((node) => getNodeId(node) === resourceName).visited = true;
}

/**
 * Mark a edge visited.
 * @param {String} graph - graph for which node is to be marked visited.
 * @param {String} sourceResource - source name of the edge which is to be marked visited.
 * @param {String} targetResource - target name of the edge which is to be marked visited.
 * @param {String} operation - operation of the edge which is to be marked visited.
 * @param {Object} span - span object containing information about the executed call.
 * @param {String} variable - variable read or modified during the call.
 */
export function markEdgeVisited(
  graph,
  sourceResource,
  targetResource,
  operation,
  span,
  variable
) {
  const visitedEdge = graph.links.find(
    (link) =>
      getNodeId(link.source) === sourceResource &&
      getNodeId(link.target) === targetResource &&
      link.operation === operation
  );

  if (visitedEdge) {
    visitedEdge.visited = true;

    // append trace details
    if (!visitedEdge.traceDetails) visitedEdge.traceDetails = [];

    let traceDetails = {
      traceId: span.traceId,
      spanId: span.spanId,
      parentSpanId: span.parentSpanId,
      startTime: span.startTimeUnixNano,
      endTime: span.endTimeUnixNano,
      variable: variable,
    };

    visitedEdge.traceDetails.push(traceDetails);
  }
}

/**
 * Returns all paths of a graph.
 * @param {Object} graph - graph for which paths are to be determined.
 */
export function getAllPaths(graph) {
  const allPaths = [];

  for (const node of graph.nodes) {
    const currentPath = [];
    traverseGraph(graph, [node], [], currentPath);
    allPaths.push(currentPath);
  }

  return flattenArray(allPaths).filter((path) => path.length > 0);
}

/**
 * Traverses the given graph recursively to generate all paths of a graph.
 * Upon each invocation, the current set of edges is added to a list of paths.
 * When no outgoing edges are found for the current node, the search ends.
 * @param {Object} graph - graph for which paths are to be determined.
 * @param {Object} pathNodes - set of all nodes of a path.
 * @param {Object} edges - set of already traversed edges.
 * @param {Object} paths - list of found paths.
 */
function traverseGraph(graph, pathNodes, edges, paths) {
  paths.push(edges);
  const currentNode = pathNodes[pathNodes.length - 1];

  const outgoingEdges = graph.links.filter((link) => {
    return getNodeId(link.source) === getNodeId(currentNode);
  });

  for (const outgoingEdge of outgoingEdges) {
    const adjacentNode = graph.nodes.find((node) => {
      return getNodeId(node) === getNodeId(outgoingEdge.target);
    });

    if (!(adjacentNode in pathNodes) && adjacentNode) {
      const newPath = pathNodes.concat([adjacentNode]);
      const newEdges = edges.concat([outgoingEdge]);
      traverseGraph(graph, newPath, newEdges, paths);
    }
  }
}

/**
 * Returns all requests of a given graph for a specified resource in sorted order (according to the start time).
 * @param {Object} graph - graph for which requests are to be determined.
 * @param {Object} resource - resource for which requests are to be determined.
 */
export function getSortedRequests(graph, resource) {
  let allRequests = [];

  graph.links
    .filter(
      (link) => getNodeId(link.target) === getNodeId(resource) && link.visited
    )
    .forEach((visitedLink) => {
      for (const element of visitedLink.traceDetails) {
        allRequests.push({
          operation: visitedLink.operation,
          startTime: element.startTime,
          endTime: element.endTime,
          source: visitedLink.source,
          target: visitedLink.target,
          variable: element.variable,
        });
      }
    });

  // sort requests according to start time
  allRequests.sort((a, b) => a.startTime - b.startTime);

  return allRequests;
}

/**
 * Returns the id of a given node.
 * @param {Object} node - node for which the id is to be returned.
 */
export function getNodeId(node) {
  return node.id ? node.id : node;
}

/**
 * Determines whether two requests reference the same link of the call graph.
 * @param {Object} link1 - first link.
 * @param {Object} link2 - second link.
 */
export function referencingSameLink(link1, link2) {
  return (
    getNodeId(link1.source) === getNodeId(link2.source) &&
    getNodeId(link1.target) === getNodeId(link2.target) &&
    link1.operation === link2.operation
  );
}
