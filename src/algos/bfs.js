import { adjList } from "../components/Graph";

const bfs = (start) => {
  const seen = new Set();
  let queue = [start];
  let res = [];
  var i = 0;
  while (queue.length !== 0 && i++ < 10) {
    res.push([...queue]);
    let tempQueue = [];
    queue.forEach((parent) => {
      seen.add(parent);
      adjList.get(parent).forEach(({ node, weight }) => {
        if (!tempQueue.includes(node) && !seen.has(node)) {
          tempQueue.push(node);
        }
      });
    });
    queue = [...tempQueue];
    console.log(queue);
  }
  return res;
};

export default bfs;

load(["a", "b", "c"], ["a", "b", "a", "c", "c", "b"]);
