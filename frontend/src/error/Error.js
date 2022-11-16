import "./Error.css";

/**
 * React component encapsulating an Error of the application.
 */
const Error = ({ errorMessage }) => {
  return (
    <div id="error" className="fixed">
      An error occurred! {errorMessage}
    </div>
  );
};

export default Error;
