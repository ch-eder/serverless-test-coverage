import "./TestCase.css";

import { runTestCase, deleteTestCase } from "../handleTestCaseRequests";
import { displayErrorMessage } from "../TestCases";

/**
 * React component encapsulating a single test case.
 */
const TestCase = ({ index, testCase }) => {
  return (
    <div className="contentBox">
      <table>
        <colgroup>
          <col className="firstCol" />
          <col className="secondCol" />
          <col className="thirdCol" />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <div className="leftAlign testCaseName">{testCase.name}</div>
            </td>
            <td>
              <div className="leftAlign">{testCase.method}</div>
            </td>
            <td>
              <div
                className="rightAlign runElement button"
                onClick={run.bind(null, testCase, index)}
              >
                Run
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="leftAlign">{testCase.resource}</div>
            </td>
            <td></td>
          </tr>
          {testCase.method === "POST" ? (
            <tr>
              <td></td>
              <td>
                <div className="leftAlign description">POST Data:</div>
                <div className="leftAlign">
                  {JSON.stringify(testCase.postData, null, 2)}
                </div>
              </td>
              <td></td>
            </tr>
          ) : (
            ""
          )}
          <tr>
            <td></td>
            <td>
              <div className="responseWrapper">
                <div className="leftAlign description">Response:</div>
                <div className="leftAlign response"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        className="rightAlign delete button"
        onClick={deleteElement.bind(null, index)}
      />
    </div>
  );
};

/**
 * Initiates the execution of a test case and subsequently displays the corresponding response.
 * @param {Object} testCase - testCase to be executed.
 * @param {Number} index - index of the test case executed.
 */
function run(testCase, index) {
  runTestCase(testCase)
    .then((response) => showResponse(index, response))
    .catch((error) => displayErrorMessage());
}

/**
 * Deletes the testCase with the given index.
 * @param {Number} index - index of the test case to be deleted.
 */
function deleteElement(index) {
  deleteTestCase(index).catch((error) => displayErrorMessage());
}

/**
 * Displays the response of a test case execution at the given test case index.
 * @param {Number} index - index of the test case executed.
 * @param {Object} response - JSON object containing the response of a test case execution.
 */
export function showResponse(index, response) {
  document.getElementsByClassName("response")[index].innerHTML = JSON.stringify(
    response,
    null,
    2
  );
  document.getElementsByClassName("responseWrapper")[index].style.display =
    "table-row";
}

export default TestCase;
