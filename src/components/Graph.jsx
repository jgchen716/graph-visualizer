import React, { Component } from "react";
import Draggable from "react-draggable"; // Both at the same time
import Xarrow from "react-xarrows";
import Results from "./Results";

import bfs from "../algos/bfs";
import bridges from "../algos/bridges";
import clusteringCoefficient from "../algos/clusteringCoefficient";
import dfs from "../algos/dfs";
import dijkstra from "../algos/dijkstra";
import topoSort from "../algos/topoSort";
import triadicClosure from "../algos/triadicClosure";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const DIM = 62.5;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const edgeColor = (selected) => {
  return selected ? "#ffd3b4" : "#98ddca";
};

const initialState = (props) => {
  return {
    nextId: 0,
    selectedId: 1,
    selectedEdge: { a: -1, b: -1 },
    undirected: props.selectedType === "undirected",
    unweighted: props.selectedWeight === "unweighted",
    algorithm: props.algorithm,
    cleared: props.cleared,
    results: props.result ? props.result : "",
    open: false,

    // classes: useStyles(),
  };
};

const ALGOS_NEED_SELECTED_NODE = ["bfs", "dfs", "dijkstra"];

class Graph extends Component {
  constructor(props) {
    super(props);
    // Map<Number, Object{Number, Number}[]>
    // Map<Node, Object{Node, Edge Weight}[]>
    this.adjList = new Map();
    this.nodeToElement = new Map();
    this.deltaPositions = new Map();
    this.state = initialState(props);

    this.getClickCoords = this.getClickCoords.bind(this);
    this.addNode = this.addNode.bind(this);
    this.selectNode = this.selectNode.bind(this);
    this.addEdge = this.addEdge.bind(this);
  }

  handleClick() {
    this.setState({ open: true });
  }

  handleClose(e, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  }

  // TODO (not as important since this doesn't affect performance too much - and not visible from normal usage): fix bug where this gets called multiple times
  shouldComponentUpdate(nextProps) {
    // condition to updated weight and directionality
    let updated = false;
    if (
      (nextProps.selectedType === "undirected") !== this.state.undirected ||
      (nextProps.selectedWeight === "unweighted") !== this.state.unweighted
    ) {
      if (
        (nextProps.selectedType === "undirected") !== this.state.undirected &&
        !this.state.undirected
      ) {
        this.adjList.forEach((neighbors, id) => {
          neighbors.forEach(({ node, weight }) => {
            this.addEdge(node, id, weight);
          });
        });
      }
      this.setState({
        undirected: nextProps.selectedType === "undirected",
        unweighted: nextProps.selectedWeight === "unweighted",
      });
      updated = true;
    }

    // condition to update clear
    if (this.state.cleared !== nextProps.cleared) {
      this.adjList = new Map();
      this.nodeToElement = new Map();
      this.deltaPositions = new Map();
      this.setState(initialState(nextProps));
      updated = true;
    }

    // condition to run algorithm
    if (
      this.state.algorithm !== nextProps.selectedAlgorithm ||
      this.state.changed
    ) {
      console.log(nextProps.selectedAlgorithm);
      let result;
      switch (nextProps.selectedAlgorithm) {
        case "bfs":
          // run bfs
          if (this.state.selectedId >= 0) {
            result = bfs(this, this.state.selectedId);
          }
          break;
        case "dfs":
          // run dfs
          if (this.state.selectedId >= 0) {
            result = dfs(this, this.state.selectedId);
          }
          break;
        case "dijkstra":
          // run dijkstra
          if (this.state.selectedId >= 0) {
            result = dijkstra(this, this.state.selectedId);
          }
          break;
        case "topo sort":
          // run topo sort
          result = topoSort(this);
          break;
        case "clustering":
          // run clustering
          // TODO: do we want to run CC on all nodes?
          if (this.state.selectedId >= 0) {
            result = clusteringCoefficient(this, this.state.selectedId);
          }
          break;
        case "bridges":
          // run bridges
          result = bridges(this);
          break;
        case "triadic":
          // run triadic
          result = triadicClosure(this);
          break;
        default:
          break;
      }
      this.setState({
        results: result,
        algorithm: nextProps.selectedAlgorithm,
        changed: false,
      });
      this.forceUpdate();
      updated = true;
    }
    return updated;
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
                this.setState({
                  selectedEdge: { a: -1, b: -1 },
                });
              }
              this.forceUpdate();
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
    this.setState({ selectedId: id, changed: true });
    console.log(this.state.changed);
    this.shouldComponentUpdate({
      cleared: this.state.cleared,
      selectedType: this.state.undirected ? "undirected" : "directed",
      selectedWeight: this.state.unweighted ? "unweighted" : "weighted",
      selectedAlgorithm: this.state.algorithm,
    });
    this.forceUpdate();
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
    console.log(this.state.selectedId);
    const edges = [];
    const drawnEdges = [];
    this.adjList.forEach((neighbors, id) => {
      neighbors.forEach((neighbor) => {
        // const x1 = this.deltaPositions.get(id)["x"];
        // const y1 = this.deltaPositions.get(id)["y"];
        // const x2 = this.deltaPositions.get(neighbor.node)["x"];
        // const y2 = this.deltaPositions.get(neighbor.node)["y"];

        // console.log(`(${x1},${y1}) & (${x2},${y2})`);
        if (
          !this.state.undirected ||
          !drawnEdges.some(
            ({ inNode, outNode }) => inNode === neighbor.node && outNode === id
          )
        ) {
          drawnEdges.push({ inNode: id, outNode: neighbor.node });
          edges.push(
            <Xarrow
              key={`Node${id}-Node${neighbor.node}`}
              start={`Node${id}`}
              end={`Node${neighbor.node}`}
              label={!this.state.unweighted ? `${neighbor.weight}` : ""}
              showHead={!this.state.undirected}
              color={edgeColor(
                this.state.selectedEdge.a === id &&
                  this.state.selectedEdge.b === neighbor.node
              )}
              strokeWidth={5}
              onClick={(e) => {
                this.setState({
                  selectedId: -1,
                  selectedEdge: { a: id, b: neighbor.node },
                });
                e.stopPropagation();
                this.forceUpdate();
              }}
              tabIndex="1"
              onKeyDown={(e) => {
                if (e.key === "Backspace" || e.key === "Delete") {
                  this.removeEdge(id, neighbor.node);
                  this.setState({
                    selectedEdge: { a: -1, b: -1 },
                  });
                } else if (e.key === "Enter") {
                  this.removeEdge(id, neighbor.node);
                  this.addEdge(id, neighbor.node, 0);
                } else if (
                  e.key === "0" ||
                  e.key === "1" ||
                  e.key === "2" ||
                  e.key === "3" ||
                  e.key === "4" ||
                  e.key === "5" ||
                  e.key === "6" ||
                  e.key === "7" ||
                  e.key === "8" ||
                  e.key === "9"
                ) {
                  let edgeWeight = 1;
                  this.adjList
                    .get(id)
                    .forEach(
                      ({ node, weight }) =>
                        (edgeWeight =
                          node === neighbor.node ? weight : edgeWeight)
                    );
                  this.removeEdge(id, neighbor.node);
                  this.addEdge(
                    id,
                    neighbor.node,
                    edgeWeight * 10 + parseInt(e.key)
                  );

                  this.forceUpdate();
                }
              }}
            />
          );
        }
      });
    });

    return (
      <div
        onClick={() => {
          this.setState({
            selectedId: -1,
            selectedEdge: { a: -1, b: -1 },
            //
          });
          this.forceUpdate();
        }}
        onDoubleClick={(e) => {
          if (
            this.state.selectedId < 0 &&
            this.state.selectedEdge.a === -1 &&
            this.state.selectedEdge.b === -1
          ) {
            this.addNode(e, this.state.nextId);
            this.setState({
              nextId: this.state.nextId + 1,
              selectedEdge: { a: -1, b: -1 },
            });
            this.forceUpdate();
          }
        }}
        className="canvas"
      >
        <div className="graph">
          {edges}
          {nodes}
        </div>
        <Results result={this.state.results} algorithm={this.state.algorithm} />
        {ALGOS_NEED_SELECTED_NODE.includes(this.state.algorithm) &&
          this.state.selectedId < 0 && (
            <div className="root">
              <Snackbar
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.handleClose}
              >
                <Alert onClose={this.handleClose} severity="warning">
                  Please select a source node!
                </Alert>
              </Snackbar>
            </div>
          )}
      </div>
    );
  }
}

export default Graph;
