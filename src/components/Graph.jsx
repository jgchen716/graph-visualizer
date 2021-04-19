import React, { Component } from "react";
import Draggable from "react-draggable"; // Both at the same time
import Xarrow from "react-xarrows";

const DIM = 62.5;

const circleStyle = (selected, x, y) => {
  return {
    padding: 0,
    margin: 10,
    position: "absolute",
    backgroundColor: selected ? "#ffd3b4" : "#98ddca",
    borderRadius: "50%",
    border: "2px solid black",
    width: DIM,
    height: DIM,
    lineHeight: `${DIM}px`,
    left: `${x - DIM / 2}px`,
    top: `${y - DIM / 2}px`,
    outlineWidth: 0,
  };
};

class Graph extends Component {
  constructor(props) {
    super(props);
    // Map<Number, Object{Number, Number}[]>
    // Map<Node, Object{Node, Edge Weight}[]>
    this.adjList = new Map();
    this.nodeToElement = new Map();
    this.deltaPositions = new Map();
    this.state = {
      nextId: 0,
      selectedId: 1,
      undirected: true,
      unweighted: true,
    };

    this.getClickCoords = this.getClickCoords.bind(this);
    this.addNode = this.addNode.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.addEdge = this.addEdge.bind(this);
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
      this.nodeToElement.set(id, () => (
        <Draggable
          bounds="parent"
          key={id}
          onDrag={(e, ui) => {
            this.deltaPositions.set(id, {
              x: this.deltaPositions.get(id)["x"] + ui.deltaX,
              y: this.deltaPositions.get(id)["y"] + ui.deltaY,
            });
            this.forceUpdate();
          }}
        >
          <div
            tabIndex="1"
            onKeyDown={(e) => {
              if (e.key === "Backspace" || e.key === "Delete") {
                this.removeNode(id);
              }
            }}
            style={circleStyle(this.state.selectedId === id, x, y)}
            onClick={(e) => {
              if (e.shiftKey) {
                this.addEdge(this.state.selectedId, id, 1);
              } else {
                this.selectNode(e, id);
              }
            }}
            className={`Node${id}`}
            id={`Node${id}`}
          >
            {id}
          </div>
        </Draggable>
      ));
      this.deltaPositions.set(id, { x: x, y: y });

      this.setState({ selectedId: id });
      this.forceUpdate();
    }
    return this;
  };

  // remove node if it's in the graph
  // no effect if node isn't in graph
  removeNode = (id) => {
    // remove from lists of neighbors
    this.adjList.forEach((neighbors, node) => {
      this.adjList.set(
        node,
        neighbors.filter((val) => val !== id)
      );

      // remove entry in adjacency list
      this.adjList.delete(id);
      this.nodeToElement.delete(id);
      this.deltaPositions.delete(id);
    });
    this.forceUpdate();
    return this;
  };

  // props = {out: number, in: number, weight: number}
  addEdge = (outNode, inNode, weight) => {
    if (this.adjList.has(outNode) && this.adjList.has(inNode)) {
      this.adjList.set(outNode, [
        ...this.adjList.get(outNode).filter((obj) => obj.node !== inNode),
        { node: inNode, weight: weight },
      ]);
      if (this.state.undirected) {
        this.adjList.set(inNode, [
          ...this.adjList.get(inNode).filter((obj) => obj.node !== outNode),
          { node: outNode, weight: weight },
        ]);
      }
    }
    this.forceUpdate();
    return this;
  };

  // props = {out: number, in: number}
  removeEdge = (outNode, inNode) => {
    if (this.adjList.has(outNode)) {
      this.adjList.set(
        outNode,
        this.adjList.get(outNode).filter((obj) => obj.node !== inNode)
      );
      if (this.state.undirected) {
        this.adjList.set(
          inNode,
          this.adjList.get(inNode).filter((obj) => obj.node !== outNode)
        );
      }
    }
    this.forceUpdate();
    return this;
  };

  selectNode = (e, id) => {
    this.setState({ selectedId: id });
    e.stopPropagation();
  };

  render() {
    const nodes = [];
    const it = this.nodeToElement.values();
    let res = it.next();
    while (!res.done) {
      nodes.push(res.value());
      res = it.next();
    }

    // console.log(this.deltaPositions);
    const edges = [];
    this.adjList.forEach((neighbors, id) => {
      neighbors.forEach((neighbor) => {
        // const x1 = this.deltaPositions.get(id)["x"];
        // const y1 = this.deltaPositions.get(id)["y"];
        // const x2 = this.deltaPositions.get(neighbor.node)["x"];
        // const y2 = this.deltaPositions.get(neighbor.node)["y"];

        // console.log(`(${x1},${y1}) & (${x2},${y2})`);

        edges.push(
          <Xarrow
            start={`Node${id}`}
            end={`Node${neighbor.node}`}
            label={!this.state.unweighted ? `${neighbor.weight}` : ""}
            showHead={!this.state.undirected}
            color="#98ddca"
            strokeWidth={3}
            onClick={() => {
              console.log("EDGE CLICKED");
            }}
          />
        );
      });
    });

    return (
      <div
        onClick={() => {
          this.setState({ selectedId: -1 });
        }}
        onDoubleClick={(e) => {
          if (this.state.selectedId < 0) {
            this.addNode(e, this.state.nextId);
            this.setState({ nextId: this.state.nextId + 1 });
          }
        }}
        className="canvas"
      >
        <div className="graph">
          {edges}
          {nodes}
        </div>
      </div>
    );
  }
}

export default Graph;
