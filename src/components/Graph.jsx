import React from "react";

function Graph() {
  // Map<Number, Object{Number, Number}[]>
  // Map<Node, Object{Node, Edge Weight}[]>
  this.adjList = new Map();

  // adds a node to the graph, if it doesn't already exist
  // does nothing if node already in graph
  const addNode = (id) => {
    if (!this.adjList.has(id)) {
      this.adjList.set(id, []);
    }
  };

  // remove node if it's in the graph
  // no effect if node isn't in graph
  const removeNode = (id) => {
    // remove entry in adjacency list
    this.adjList.delete(id);

    // remove from lists of neighbors
    this.adjList.forEach((node) => {
      const neighbors = this.adjList[node];
      if (neighbors.has(id)) {
        neighbors.delete(id);
      }
    });
  };

  // props = {out: number, in: number, weight: number}
  const addEdge = (outNode, inNode, weight) => {
    if (this.adjList.has(outNode) && this.adjList.has(inNode)) {
      this.adjList.set(outNode, [
        ...this.adjList.get(outNode),
        { node: inNode, weight: weight },
      ]);
    }
  };

  // props = {out: number, in: number}
  const removeEdge = (outNode, inNode) => {
    if (this.adjList.has(outNode)) {
      this.adjList.set(
        outNode,
        this.adjList.get(outNode).filter((obj) => obj.node !== inNode)
      );
    }
  };

  const load = (nodes, edges) => {
    for (var i = 0; i < nodes.length; i++) {
      addNode(nodes[i]);
    }
    for (var i = 0; i < edges.length; i += 2) {
      addEdge(edges[i], edges[i + 1], 1);
    }
  };

  return <></>;
}

export default Graph;
