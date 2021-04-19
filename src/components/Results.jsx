import React from "react";

const defaultText = "Click on an algorithm to get started!";

const Results = (props) => {
  // TODO: UPDATE TEXT
  return (
    <div className="results">
      <h2 className="results-heading">Results</h2>
      <div className="output-window">{defaultText}</div>
    </div>
  );
};

export default Results;
