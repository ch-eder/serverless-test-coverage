import {
  getSortedRequests,
  getNodeId,
  referencingSameLink,
} from "./graphUtils";
import { flattenArray } from "./utils";

// definitions of def and uses operations, organized by resource type
const defAndUsesOperations = {
  database: { def: ["PutItem", "DeleteItem"], use: ["Scan", "GetItem"] },
};

/**
 * Computes the coverages of all def operations of the specified graph.
 * @param {Object} graph - graph for which the data coverage is to be calculated.
 */
export function getCoverages(graph) {
  let coverages = [];

  try {
    coverages = coverages.concat(getCoverageForResourceType(graph, "database"));
    // further options, such as direct data transfer through function invocations, can be added here
  } catch (error) {
    console.warn(
      "The computed coverages might be incomplete, due to errors during computation."
    );
  }

  return flattenArray(coverages);
}

/**
 * Computes the coverages for the specified resource type.
 * This is done by iterating over all nodes of the given resource type and assembling the coverages accordingly.
 * @param {Object} graph - graph for which the data coverage is to be calculated.
 * @param {String} resourceType - type of the resource for which the data coverage is to be calculated.
 */
function getCoverageForResourceType(graph, resourceType) {
  const resourceCoverage = [];
  const resources = graph.nodes.filter((node) => node.type === resourceType);

  for (const resource of resources) {
    const coverage = getCoverageForResource(graph, resource, resourceType);
    resourceCoverage.push(coverage);
  }

  return resourceCoverage;
}

/**
 * Computes the coverage for a given resource.
 * @param {Object} graph - graph for which the data coverage is to be calculated.
 * @param {Object} resource - resource for which the data coverage is to be calculated.
 * @param {String} resourceType - type of the resource for which the data coverage is to be calculated.
 */
function getCoverageForResource(graph, resource, resourceType) {
  const allRequests = getSortedRequests(graph, resource);
  // find all uses operations present in allRequests
  const requiredUsesOperations = graph.links.filter(
    (request) =>
      isOperationOfClass("use", resourceType, request.operation) &&
      getNodeId(resource) === getNodeId(request.target)
  );
  const allCoverages = [];

  // browse through all requests and record coverage of def operations
  for (let i = 0; i < allRequests.length; i++) {
    const request = allRequests[i];

    if (isOperationOfClass("def", resourceType, request.operation)) {
      const defCoverage = { def: request, uses: [] };

      for (let j = i + 1; j < allRequests.length; j++) {
        const followingRequest = allRequests[j];

        if (request.endTime < followingRequest.startTime) {
          // variable is overwritten by other def operation
          if (
            isOperationOfClass(
              "def",
              resourceType,
              followingRequest.operation
            ) &&
            request.variable === followingRequest.variable
          ) {
            break;
          }

          // variable is used by uses request
          if (
            isOperationOfClass(
              "use",
              resourceType,
              followingRequest.operation
            ) &&
            (request.variable === followingRequest.variable ||
              (request.variable.resourceName ===
                followingRequest.variable.resourceName &&
                followingRequest.variable.variableName === "all"))
          ) {
            defCoverage.uses.push(followingRequest);
          }
        }
      }

      defCoverage["allUses"] = requiredUsesOperations;
      allCoverages.push(defCoverage);
    }
  }

  return allCoverages;
}

/**
 * Attempts to find a specific def-coverage in the given coverages.
 * @param {Object} coverages - object encapsulating all coverages computed for a certain graph.
 * @param {Object} def - def operation for which coverage is to be found.
 */
export function findDevCoverage(coverages, def) {
  return coverages.find((element) => referencingSameLink(element.def, def));
}

/**
 * Retrieves all operations of a specific operation class (def or uses) incorporated in a given graph.
 * @param {String} operationClass - the class of the operation for which operations are to be retrieved.
 * @param {String} resourceType - type of the resource for which operations are to be retrieved.
 * @param {Object} graph - graph for which operations are to be found.
 */
export function getAllOperationsOfClass(operationClass, resourceType, graph) {
  let coverages = [];

  try {
    coverages = coverages.concat(
      graph.links.filter((link) =>
        isOperationOfClass(operationClass, resourceType, link.operation)
      )
    );
    // further options, such as data transfer through events, can be added here
  } catch (error) {
    console.warn(
      "The computed coverages might be incomplete, due to errors during computation."
    );
  }

  return coverages;
}

/**
 * Determines whether a given operation is classified as def / uses operation.
 * @param {String} operationClass - the class of the operation for which membership is to be determined.
 * @param {String} resourceType - type of the resource on which operation is performed.
 * @param {Object} operation - operation for which classification should be determined.
 */
function isOperationOfClass(operationClass, resourceType, operation) {
  return defAndUsesOperations[resourceType][operationClass].includes(operation);
}
