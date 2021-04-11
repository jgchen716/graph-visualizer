import React from "react";

function Graph() {
  // Map<Number, Object{Number, Number}>[]>
  // Map<Node, Object<Node, Edge Weight>[]>
  this.adjList = new Map();

  // adds a node to the graph, if it doesn't already exist
  // does nothing if node already in graph
  const addNode = (props) => {
    if (!this.adjList.has(props.id)) {
      this.adjList.set(props.id, []);
    }
  };

  // remove node if it's in the graph
  // no effect if node isn't in graph
  const removeNode = (props) => {
    // remove entry in adjacency list
    this.adjList.delete(props.id);

    // remove from lists of neighbors
    this.adjList.forEach((node) => {
      const neighbors = this.adjList[node];
      if (neighbors.has(props.id)) {
        neighbors.delete(props.id);
      }
    });
  };

  // props = {out: number, in: number, weight: number}
  const addEdge = (props) => {
    if (this.adjList.has(props.out) && this.adjList.has(props.in)) {
      this.adjList.set(
        props.out,
        this.adjList
          .get(props.out)
          .push({ node: props.in, weight: props.weight })
      );
    }
  };

  // props = {out: number, in: number}
  const removeEdge = (props) => {
    if (this.adjList.has(props.out)) {
      this.adjList.set(
        props.out,
        this.adjList.get(props.out).filter((obj) => obj.node !== props.in)
      );
    }
  };

  return <></>;
}

export default Graph;
