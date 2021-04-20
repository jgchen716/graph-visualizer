// Tarjan's algorithm (full recursive DFS traversal)
const topoSort = (g) => {
  // stack of nodes to return in order of decreasing finish timed
  const finished = [];
  // map of node to color (0 is undiscovered, 1 is discovered, 2 is finished)
  const color = new Map();
  let valid = true;

  // initialize color of each node to 0
  g.adjList.forEach((values, node) => {
    color.set(node, 0);
  });

  g.adjList.forEach((values, node) => {
    // if undiscovered, visit node
    if (color.get(node) === 0) {
      if (!dfsVisit(g, node, color, finished)) {
        valid = false;
      }
    }
  });
  // return nodes in decreasing order of finish times
  return { valid: valid, res: finished.reverse() };
};

// DFS helper method
function dfsVisit(g, node, color, finished) {
  color.set(node, 1);
  // iterate through neighbors
  const neighbors = g.adjList.get(node);
  let valid = true;
  neighbors.forEach(({ node: v, weight }) => {
    // found back edge, which implies cycle exists so no valid topo sort
    if (color.get(v) === 1) {
      // return empty stack when no valid topo sort
      valid = false;
    }

    if (color.get(v) === 0) {
      if (!dfsVisit(g, v, color, finished)) {
        valid = false;
      }
    }
  });

  // update color and finished stack since node is finished
  color.set(node, 2);
  finished.push(node);
  return valid;
}

export default topoSort;
