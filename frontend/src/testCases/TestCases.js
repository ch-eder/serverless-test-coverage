import "./TestCases.css";

import TestCaseComponent, { showResponse } from "./testCase/TestCase";
import AddTestCaseComponent from "./addTestCase/AddTestCase";
import ErrorComponent from "../error/Error";

import { runTestCase } from "./handleTestCaseRequests";

import testCases from "../data/testCases.json";

/**
 * React component encapsulating the TestCase section of the application.
 */
const TestCase = () => {
  return (
    <main>
      <div className="topbar">
        Scope Application
        <span id="runAll" className="featureTop button" onClick={runAll}>
          Run All
        </span>
        <span
          id="addTestCase"
          className="featureTop button"
          onClick={showAddTestCaseForm}
        >
          Add Test Case
        </span>
      </div>
      {testCases.map((testCase, index) => {
        return (
          <TestCaseComponent key={index} index={index} testCase={testCase} />
        );
      })}
      <AddTestCaseComponent />
      <ErrorComponent />
    </main>
  );
};

/**
 * Initiates the execution of all specified test cases and subsequently displays the corresponding responses.
 */
function runAll() {
  for (let i = 0; i < testCases.length; i++) {
    runTestCase(testCases[i])
      .then((response) => showResponse(i, response))
      .catch((error) => displayErrorMessage());
  }
}

/**
 * Displays the HTML form for adding a new test case in the UI.
 */
function showAddTestCaseForm() {
  const addTestCaseForm = document.getElementById("addTestCaseForm");
  addTestCaseForm.style.display = "block";
  addTestCaseForm.scrollIntoView();
}

/**
 * Displays the error in the UI for 4 seconds.
 */
export function displayErrorMessage() {
  const errorMessage = document.getElementById("error");
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 4000);
}

export default TestCase;
