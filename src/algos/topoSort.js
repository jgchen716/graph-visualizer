// Tarjan's algorithm (full DFS traversal)
const topoSort = (g) => {
  // stack for iterative DFS
  const stack = [];
  // stack of nodes to return in order of decreasing finish timed
  const finished = [];
  // set of discovered nodes
  const discovered = new Set();

  g.adjList.forEach((values, node) => {
    if (!discovered.has(node)) {
      stack.push(node);

      while (stack.length !== 0) {
        const curr = stack.pop();
        const outneighbors = g.adjList.get(curr);

        discovered.add(curr);
        outneighbors.forEach(({ neighbor, weight }) => {
          if (!discovered.has(neighbor)) {
            stack.push(neighbor);
          }
        });
      }

      finished.push(node);
    }
  });

  return finished;
};

export default topoSort;
