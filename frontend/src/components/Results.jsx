import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const emptyResults = (
  <div className="results">
    <h2 className="results-heading">Results</h2>
    <div className="output-window">Click on an algorithm to get started!</div>
  </div>
);

const saveResults = (alg, res) => {
  const resultObj = { algorithm: alg, result: res };
  axios.post('localhost:3001/graph', resultObj).then(response => console.log(response));
};

const resultsToText = (result, algorithm) => {
  const separator = "----------";
  switch (algorithm) {
    case "bfs":
      let bfsString = [];
      var frontierCount = 0;
      bfsString.push(`Source Node: Node${result[0][0]}`);
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
      let topoString = [];
      if (!result.valid) {
        topoString.push("No valid topo sort, graph cannot have cycle.");
      } else {
        topoString.push(
          <>
            One potential ordering:
            <br />
          </>
        );
        result.res.forEach((node) => {
          topoString.push(
            <div key={node}>
              - Node{node}
              <br />
            </div>
          );
        });
      }
      return (
        <>
          Topological Sort
          <br />
          {separator}
          <br />
          {topoString}
        </>
      );
    case "clustering":
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
      let bridgesString = [];
      if (result.size === 0) {
        bridgesString.push("No global bridges found.");
      } else {
        bridgesString.push(
          <div>
            Global Bridges:
            <br />
          </div>
        );
        result.forEach(({ node1, node2 }) => {
          bridgesString.push(
            <div key={`Node${node1} -> Node${node2}`}>
              - Node{node1} {"<->"} Node{node2}
              <br />
            </div>
          );
        });
      }
      return (
        <>
          Global Bridges
          <br />
          {separator}
          <br />
          {bridgesString}
        </>
      );
    case "triadic":
      let triadicString = [];
      if (result.size === 0) {
        triadicString.push(
          <div>
            No new edges would be formed due to Triadic Closure.
            <br />
          </div>
        );
      } else {
        triadicString.push(
          <div>
            New Edges Formed due to Triadic Closure:
            <br />
          </div>
        );
        result.forEach(({ NodeA, NodeB }) => {
          triadicString.push(
            <div key={`Node${NodeA} -> Node${NodeB}`}>
              - Node{NodeA} {"->"} Node{NodeB}
              <br />
            </div>
          );
        });
      }
      return (
        <>
          Triadic Closure
          <br />
          {separator}
          <br />
          {triadicString}
        </>
      );
    default:
      return "";
  }
};

const Results = ({ result, algorithm }) => {
  const emptyCondition =
    result === undefined || algorithm === undefined || algorithm === "";
  return emptyCondition ? (
    emptyResults
  ) : (
    <div className="results">
      <h2 className="results-heading">Results</h2>
      <div className="output-window">{resultsToText(result, algorithm)}</div>
      <div className="btn">
        <Button
          variant="contained"
          color="success"
          onClick={saveResults(algorithm, result)}
        >
          SAVE
        </Button>
      </div>
    </div>
  )
};

export default Results;
