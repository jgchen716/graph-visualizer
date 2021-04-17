import React, { Component } from "react";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

const circleStyle = (selected) => {
  return {
    padding: 0,
    margin: 10,
    position: "absolute",
    backgroundColor: selected ? "#ffd3b4" : "#98ddca",
    borderRadius: "50%",
    border: "2px solid black",
    width: 62.5,
    height: 62.5,
    lineHeight: "62.5px",
  };
};

class Graph extends Component {
  constructor(props) {
    super(props);
    // Map<Number, Object{Number, Number}[]>
    // Map<Node, Object{Node, Edge Weight}[]>
    this.adjList = new Map();
    this.nodeToElement = new Map();
    this.state = { selectedId: 1 };

    this.getClickCoords = this.getClickCoords.bind(this);
    this.addNode = this.addNode.bind(this);
    // this.getClickCoords = this.getClickCoords.bind(this);
  }

  getClickCoords = (event) => {
    // from: https://stackoverflow.com/a/29296049/14198287
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };

  // adds a node to the graph, if it doesn't already exist
  // does nothing if node already in graph
  addNode = (e, id) => {
    if (!this.adjList.has(id)) {
      this.adjList.set(id, []);

      const [x, y] = this.getClickCoords(e);
      this.nodeToElement.set(
        id,
        <div
          style={
            (circleStyle(false),
            {
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
            })
          }
        >
          {id}
        </div>
      );

      this.forceUpdate();

      this.setState({ selectedId: id });

      // console.log(this.nodeToElement);
    }
    return this;
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
    return this;
  };

  // props = {out: number, in: number, weight: number}
  addEdge = (outNode, inNode, weight) => {
    if (this.adjList.has(outNode) && this.adjList.has(inNode)) {
      this.adjList.set(outNode, [
        ...this.adjList.get(outNode),
        { node: inNode, weight: weight },
      ]);
    }
    return this;
  };

  // props = {out: number, in: number}
  removeEdge = (outNode, inNode) => {
    if (this.adjList.has(outNode)) {
      this.adjList.set(
        outNode,
        this.adjList.get(outNode).filter((obj) => obj.node !== inNode)
      );
    }
    return this;
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
    const nodes = [];
    const it = this.nodeToElement.keys();
    // console.log(this.nodeToElement);
    let res = it.next();
    console.log(this.adjList.size + "   " + this.nodeToElement.size);
    while (!res.done) {
      // console.log(res.value);
      nodes.push(
        <Draggable bounds="parent">
          {/* {res.value} */}
          <div style={circleStyle(this.state.selectedId === res.value)}>
            {res.value}
          </div>
        </Draggable>
      );
      res = it.next();
    }
    // console.log(nodes);
    return <div className="graph">{nodes}</div>;
  }
}

export default Graph;
