import { adjList } from "../components/Graph";

// start - node to start DFS from
// only visits nodes reachable from start
const dfs = (start) => {
  // stack for iterative DFS
  const stack = [];
  // array of nodes to return
  const result = [];
  // set of discovered nodes
  const discovered = new Set();

  stack.push(start);
  const outneighbors = adjList.get(start);

  while (stack.length !== 0) {
    const curr = stack.pop();
    result.push(curr);

    if (!discovered.has(curr)) {
      discovered.add(curr);
    }

    outneighbors.forEach(({ neighbor, weight }) => {
      if (!discovered.has(neighbor)) {
        stack.push(neighbor);
      }
    });
  }

  return result;
};

export default dfs;
