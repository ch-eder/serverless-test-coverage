import { RequestError } from "../error/RequestError";

/**
 * Runs a given test case.
 * Currently, HTTP GET and HTTP POST request can be run.
 * Other test case executions have not been implemented so far.
 * @param {Object} test case - test case to be run.
 */
export async function runTestCase(testCase) {
  if (testCase.method === "GET") {
    return await fetch(testCase.resource).then((response) => response.json());
  } else if (testCase.method === "POST") {
    return await fetch(testCase.resource, {
      method: "post",
      body: JSON.stringify(testCase.postData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status >= 400)
          throw RequestError("Saving the test case failed");
        return response.json();
      })
      .catch((error) => {
        throw RequestError("Saving the test case failed");
      });
  }
}

/**
 * Saves the given test case.
 * @param {Object} test case - test case to be saved.
 */
export async function saveTestCase(testCase) {
  return await fetch("/append", {
    method: "post",
    mode: "cors",
    body: JSON.stringify(testCase),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status >= 400)
      throw RequestError("Saving the test case failed");
  });
}

/**
 * Deletes a given test case by its index.
 * @param {Number} index - index of the test case to be deleted.
 */
export async function deleteTestCase(index) {
  await fetch("/" + index, {
    method: "delete",
    mode: "cors",
  }).then((response) => {
    if (response.status >= 400)
      throw RequestError("Deleting the test case failed");
  });
}
