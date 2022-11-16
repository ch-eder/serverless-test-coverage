import ProgressBar from "react-bootstrap/ProgressBar";

import "./CoverageCriteria.css";

import {
  cfComputeAllResources,
  cfComputeAllResourceRelations,
  cfComputeAllResourceSequences,
} from "./computeCoverageCF";
import {
  getCoverages,
  getAllOperationsOfClass,
} from "../../util/dataCoverageUtils";
import {
  dfComputeAllResourcesDefs,
  dfComputeAllResourcesDefUse,
  dfComputeAllResourcesUses,
} from "./computeCoverageDF";

/**
 * React component encapsulating the CoverageCriteria section of the application.
 */
const CoverageCriteria = ({ graph }) => {
  const cfAllResources = cfComputeAllResources(graph);
  const cfAllResourcesRelations = cfComputeAllResourceRelations(graph);
  const cfAllResourceSequences = cfComputeAllResourceSequences(graph);

  const coverages = getCoverages(graph);
  const allDefs = getAllOperationsOfClass("def", "database", graph);
  const allUses = getAllOperationsOfClass("use", "database", graph);

  const dfAllResourcesDefs = dfComputeAllResourcesDefs(coverages, allDefs);
  const dfAllResourcesDefUse = dfComputeAllResourcesDefUse(
    coverages,
    allDefs,
    allUses
  );
  const dfAllResourcesUses = dfComputeAllResourcesUses(coverages, allDefs);

  return (
    <div className="coverageCriteriaRowContainer">
      <div className="contentBox coverageCriteriaContainer" id="left">
        <table className="leftAlignTable">
          <thead>
            <tr>
              <th>Control Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All-resources</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={cfAllResources}
                  label={`${cfAllResources}%`}
                />
              </td>
            </tr>
            <tr>
              <td>All-resources-relations</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={cfAllResourcesRelations}
                  label={`${cfAllResourcesRelations}%`}
                />
              </td>
            </tr>
            <tr>
              <td>All-resources-sequences</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={cfAllResourceSequences}
                  label={`${cfAllResourceSequences}%`}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="contentBox coverageCriteriaContainer" id="right">
        <table className="leftAlignTable">
          <thead>
            <tr>
              <th>Data Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All-resources-defs</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={dfAllResourcesDefs}
                  label={`${dfAllResourcesDefs}%`}
                />
              </td>
            </tr>
            <tr>
              <td>All-resources-defuse</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={dfAllResourcesDefUse}
                  label={`${dfAllResourcesDefUse}%`}
                />
              </td>
            </tr>
            <tr>
              <td>All-resources-uses</td>
              <td>
                <ProgressBar
                  variant="testCoverage"
                  now={dfAllResourcesUses}
                  label={`${dfAllResourcesUses}%`}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoverageCriteria;
