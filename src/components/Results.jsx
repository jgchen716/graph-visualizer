import React from "react";

const emptyResults = (
  <div className="results">
    <h2 className="results-heading">Results</h2>
    <div className="output-window">Click on an algorithm to get started!</div>
  </div>
);

const resultsToText = (result, algorithm) => {
  const separator = "----------";
  switch (algorithm) {
    case "bfs":
      let bfsString = [];
      var frontierCount = 0;
      result.forEach((frontier) => {
        frontier = frontier.sort(function (a, b) {
          return a - b;
        });
        let currString = `Frontier ${frontierCount++}: `;
        frontier.forEach((node) => (currString += `Node${node}, `));
        currString = currString.slice(0, currString.lastIndexOf(",")); // slice off last ", "
        bfsString.push(
          <>
            - {currString}
            <br />
          </>
        );
      });
      return (
        <>
          BFS
          <br />
          {separator}
          <br />
          {bfsString}
        </>
      );
    case "dfs":
      let dfsString = [];
      result.forEach((node) =>
        dfsString.push(
          <>
            - Node{node}
            <br />
          </>
        )
      );
      return (
        <>
          DFS
          <br />
          {separator}
          <br />
          Order of Nodes Visited:
          <br />
          {dfsString}
        </>
      );
    case "dijkstra":
      let dijkstraString = [];
      result.forEach(({ node, distance }) => {
        dijkstraString.push(
          <>
            - Node{node}: {distance} units
            <br />
          </>
        );
      });
      return (
        <>
          Dijkstra
          <br />
          {separator}
          <br />
          Shortest distances from Node{result[0].node}:
          <br />
          {dijkstraString}
        </>
      );
    case "topo sort":
      return "Topological Sort";
    case "clustering":
      return "Clustering Coefficient";
    case "bridges":
      return "Global Bridges";
    case "triadic":
      return "Triadic Closure";
    default:
      return "";
  }
};

const Results = ({ result, algorithm }) => {
  // TODO: UPDATE TEXT
  console.log(result);
  const emptyCondition =
    result === undefined || algorithm === undefined || algorithm === "";
  return emptyCondition ? (
    emptyResults
  ) : (
    <div className="results">
      <h2 className="results-heading">Results</h2>
      <div className="output-window">{resultsToText(result, algorithm)}</div>
    </div>
  );
};

export default Results;
