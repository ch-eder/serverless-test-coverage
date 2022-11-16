/**
 * Custom error for representing exceptions occurring in relation to a request.
 */
export class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequestError";
  }
}
