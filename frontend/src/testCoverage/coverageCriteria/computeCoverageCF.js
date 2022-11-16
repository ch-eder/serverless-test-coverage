import { getAllPaths } from "../../util/graphUtils";
import { calculatePercentage } from "../../util/utils";

/**
 * Computes the all-resources criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function cfComputeAllResources(graph) {
  try {
    if (graph.nodes.length === 0) return 100;
    const visitedNodes = graph.nodes.filter((node) => node.visited);
    return calculatePercentage(visitedNodes.length, graph.nodes.length);
  } catch (error) {
    return 0;
  }
}

/**
 * Computes the all-resources-relations criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function cfComputeAllResourceRelations(graph) {
  try {
    if (graph.links.length === 0) return 100;
    const visitedEdges = graph.links.filter((link) => link.visited);
    return calculatePercentage(visitedEdges.length, graph.links.length);
  } catch (error) {
    return 0;
  }
}

/**
 * Computes the all-resources-sequences criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function cfComputeAllResourceSequences(graph) {
  try {
    const totalPaths = getAllPaths(graph);
    if (totalPaths.length === 0) return 100;

    const visitedPaths = totalPaths.filter((path) => {
      if (path.length === 1) return path[0].visited;

      return pathIsVisited(path);
    });

    return calculatePercentage(visitedPaths.length, totalPaths.length);
  } catch (error) {
    return 0;
  }
}

/**
 * Determines if a given path is completely visited.
 * The determination is performed using traceIds, spanIds and parentSpanIds.
 * @param {Object} path - path for which determination is to be made.
 */
function pathIsVisited(path) {
  if (!path[0].visited) return false;
  const traceDetails = path[0].traceDetails;

  // examine each single trace individually
  for (const traceDetail of traceDetails) {
    const traceId = traceDetail.traceId;
    let prevSpanId = traceDetail.spanId;
    let endTraceId = false;

    // for each traceId, determine if all nodes are visited
    for (let i = 1; i < path.length; i++) {
      const node = path[i];
      if (!node.visited) {
        endTraceId = true;
        break;
      }
      const successor = node.traceDetails.find(
        (traceDetail) =>
          traceDetail.traceId === traceId &&
          traceDetail.parentSpanId === prevSpanId
      );
      if (!successor) {
        endTraceId = true;
        break;
      }
      prevSpanId = successor.spanId;
    }

    if (!endTraceId) return true;
  }

  return false;
}
