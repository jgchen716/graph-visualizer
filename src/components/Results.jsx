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
          <div key={frontierCount}>
            - {currString}
            <br />
          </div>
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
          <div key={node}>
            - Node{node}
            <br />
          </div>
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
          <div key={`Node${node}: ${distance} units`}>
            - Node{node}: {distance} units
            <br />
          </div>
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
      // TODO: works for 1 node
      let clusteringString = [];
      result.forEach(({ node, cc }) => {
        clusteringString.push(
          <div key={node}>
            - Node{node}: {cc.toFixed(2)}
            <br />
          </div>
        );
      });
      return (
        <>
          Clustering Coefficient
          <br />
          {separator}
          <br />
          {clusteringString}
        </>
      );
    case "bridges":
      return "Global Bridges";
    case "triadic":
      let triadicString = [];
      result.forEach(({ NodeA, NodeB }) => {
        triadicString.push(
          <div key={`Node${NodeA} -> Node${NodeB}`}>
            - Node{NodeA} {"->"} Node{NodeB}
            <br />
          </div>
        );
      });
      return (
        <>
          Triadic Closure
          <br />
          {separator}
          <br />
          New Edges Formed due to Triadic Closure:
          <br />
          {triadicString}
        </>
      );
    default:
      return "";
  }
};

const Results = ({ result, algorithm }) => {
  // TODO: UPDATE TEXT
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
