// start - node to start DFS from
// only visits nodes reachable from start
const dfs = (start, g) => {
  // stack for iterative DFS
  const stack = [];
  // array of nodes to return
  const result = [];
  // set of discovered nodes
  const discovered = new Set();

  stack.push(start);

  while (stack.length !== 0) {
    const curr = stack.pop();
    const outneighbors = g.adjList.get(curr);

    if (!discovered.has(curr)) {
      result.push(curr);
      discovered.add(curr);
    }

    outneighbors.forEach(({ node, weight }) => {
      if (!discovered.has(node)) {
        stack.push(node);
      }
    });
  }

  return result;
};

export default dfs;
