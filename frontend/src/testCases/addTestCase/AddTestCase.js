import "./AddTestCase.css";

import { saveTestCase } from "../handleTestCaseRequests";
import { displayErrorMessage } from "../TestCases";

/**
 * React component encapsulating the AddTestCase section of the application.
 */
const AddTestCase = () => {
  return (
    <div id="addTestCaseForm" className="contentBox">
      <form onSubmit={save}>
        <table>
          <colgroup>
            <col className="firstCol" />
            <col className="secondCol" />
            <col className="thirdCol" />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <div className="leftAlign">
                  <input
                    type="text"
                    id="newTestCaseName"
                    placeholder="Name"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="leftAlign">
                  <select
                    id="newTestCaseMethod"
                    className="button"
                    onChange={handleChange}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>
                </div>
              </td>
              <td>
                <div
                  className="rightAlign cancel button"
                  onClick={hideAddTestCaseForm}
                >
                  Cancel
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="leftAlign">
                  <input
                    type="text"
                    id="newTestCaseResource"
                    placeholder="www.examle.com/path"
                    required
                  />
                </div>
              </td>
              <td></td>
            </tr>
            <tr id="postDataField">
              <td></td>
              <td>
                <div className="leftAlign">
                  <input
                    type="text"
                    id="newTestCasePostData"
                    placeholder="Data"
                  />
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="rightAlign">
          <input
            className="saveElement button"
            type="Submit"
            value="Save"
            readOnly
          ></input>
        </div>
      </form>
    </div>
  );
};

/**
 * Initiates the saving of the currently specified test case and subsequently hides the corresponding HTML form.
 * @param {Object} event - event indicating the saving of the currently specified test case.
 */
function save(event) {
  event.preventDefault();

  const name = document.getElementById("newTestCaseName");
  const method = document.getElementById("newTestCaseMethod");
  const resource = document.getElementById("newTestCaseResource");
  const postData = document.getElementById("newTestCasePostData");

  let newTestCase = {
    name: name.value,
    method: method.value,
    resource: resource.value,
  };

  if (method.value === "POST") newTestCase["postData"] = postData.value;

  saveTestCase(newTestCase)
    .then(hideAddTestCaseForm)
    .catch((error) => displayErrorMessage());

  name.value = resource.value = postData.value = "";
  method.value = "GET";
  postData.style.display = "none";
}

/**
 * Hides the HTML form for adding a new test case in the UI.
 */
function hideAddTestCaseForm() {
  document.getElementById("addTestCaseForm").style.display = "none";
}

/**
 * Handles changes in the drop down menu for HTTP method selection.
 * When the HTTP method GET is selected, no additional field for specifying POST values is displayed.
 * In the case of a HTTP POST request, the additional field is included.
 * @param {Object} event - event indicating a change in the selected drop down menu.
 */
function handleChange(event) {
  const postDataField = document.getElementById("postDataField");
  if (event.target.value === "GET") postDataField.style.display = "none";
  if (event.target.value === "POST") postDataField.style.display = "table-row";
}

export default AddTestCase;
