import { adjList } from "../components/Graph";

const bfs = (props) => {
  const seen = new Set();
  let queue = [props.start];
  let res = [];
  while (queue.length !== 0) {
    res.push([...queue]);
    let tempQueue = [];
    for (const node of queue) {
      seen.add(node);
      for (const { neighbor, weight } of adjList[node]) {
        if (!tempQueue.includes(neighbor) && !seen.has(neighbor)) {
          tempQueue.push(node);
        }
      }
    }
    queue = [...tempQueue];
  }
  return res;
};
