import { adjList } from "../components/Graph";

const dijkstra = (props) => {
  const start = props.start;
  const end = props.end;
  const distances = new Map();
  const res = [];
  for (const node of adjList.keys()) {
    distances.set(node, Number.MAX_VALUE);
  }
  distances.set(start, 0);

  // max is number of keys
  let numIterations = 0;
  while (numIterations++ < adjList.size) {}
};
