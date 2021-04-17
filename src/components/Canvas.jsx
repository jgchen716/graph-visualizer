import React, { Component } from "react";
import Graph from "./Graph";

import pleaseStopTriggeringClicksOnDoubleClick from "../util";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.selectNode = this.selectNode.bind(this);
    this.placeNode = this.placeNode.bind(this);

    this.state = { graph: new Graph() };

    // [handleClick, handleDoubleClick] useClickPreventionOnDoubleClick(
    //   this.selectNode,
    //   this.placeNode
    // )
    // const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    //   selectNode,
    //   placeNode
    // );
  }
  // const [graph, setGraph] = useState(new Graph());

  selectNode(e) {
    console.log("selecting node");
    // this.forceUpdate();
  }

  placeNode(e) {
    console.log("placing node");
    this.setState(
      this.state.graph.addNode(e, Math.floor(Math.random() * 10).toFixed(0))
    );
  }

  render() {
    return (
      <pleaseStopTriggeringClicksOnDoubleClick>
        <div
          // onClick={this.selectNode}
          onDoubleClick={this.placeNode}
          className="canvas"
        >
          {/* {this.state.graph.render()} */}
          <Graph selectNode={this.selectNode} />
        </div>
      </pleaseStopTriggeringClicksOnDoubleClick>
    );
  }
}

export default Canvas;
