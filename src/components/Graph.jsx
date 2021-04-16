import React, { Component } from "react";

class Graph extends Component {
  constructor(props) {
    super(props);
    // Map<Number, Object{Number, Number}[]>
    // Map<Node, Object{Node, Edge Weight}[]>
    this.adjList = new Map();
  }

  // adds a node to the graph, if it doesn't already exist
  // does nothing if node already in graph
  addNode = (id) => {
    if (!this.adjList.has(id)) {
      this.adjList.set(id, []);
    }
  };

  // remove node if it's in the graph
  // no effect if node isn't in graph
  removeNode = (id) => {
    // remove entry in adjacency list
    this.adjList.delete(id);

    // remove from lists of neighbors
    this.adjList.forEach((node) => {
      const neighbors = this.adjList.get(node);
      if (neighbors.has(id)) {
        neighbors.delete(id);
      }
    });
  };

  // props = {out: number, in: number, weight: number}
  addEdge = (outNode, inNode, weight) => {
    if (this.adjList.has(outNode) && this.adjList.has(inNode)) {
      this.adjList.set(outNode, [
        ...this.adjList.get(outNode),
        { node: inNode, weight: weight },
      ]);
    }
  };

  // props = {out: number, in: number}
  removeEdge = (outNode, inNode) => {
    if (this.adjList.has(outNode)) {
      this.adjList.set(
        outNode,
        this.adjList.get(outNode).filter((obj) => obj.node !== inNode)
      );
    }
  };

  load = (nodes, edges) => {
    for (var i = 0; i < nodes.length; i++) {
      this.addNode(nodes[i]);
    }
    for (i = 0; i < edges.length; i += 3) {
      this.addEdge(edges[i], edges[i + 1], edges[i + 2]);
    }
  };

  render() {
    return <div>Current number of nodes: {this.adjList.size}</div>;
  }
}

export default Graph;
