import React from "react";
import Graph from "./Graph";

import useClickPreventionOnDoubleClick from "../util";

const Canvas = () => {
  const state = { graph: new Graph() };

  const selectNode = (e) => {
    console.log("selecting node");
    // this.forceUpdate();
  };

  const placeNode = (e) => {
    console.log("placing node");
    // this.state.graph.addNode(Math.random() * 100);
    // this.forceUpdate();
    // console.log(this.state.graph.adjList.size);
  };

  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    selectNode,
    placeNode
  );

  return (
    <div onClick={handleClick} onDoubleClick={handleDoubleClick}>
      CANVAS: {state.graph.render()}
    </div>
  );
};

export default Canvas;
