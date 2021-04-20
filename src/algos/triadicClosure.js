// INVARIANT: assumes undirected graph
// returns a Set of obj {NodeA, NodeB}, which represents edges formed
// Note: if edge forms between NodeA and NodeB, output set will contain
// {NodeA, NodeB} and {NodeB, NodeA}
const triadicClosure = (g) => {
  const res = new Set();

  g.adjList.forEach((neighborsA, nodeA) => {
    g.adjList.forEach((neighborsB, nodeB) => {
      if (nodeA !== nodeB && shareNeighbor(g, neighborsA, neighborsB)) {
        res.add({ NodeA: nodeA, NodeB: nodeB });
      }
    });
  });
  return res;
};

const shareNeighbor = (g, neighborsA, neighborsB) => {
  var shared = false;
  neighborsA.forEach((neighborA) => {
    if (neighborsB.some((neighborB) => neighborA.node === neighborB.node)) {
      shared = true;
    }
  });
  return shared;
};

export default triadicClosure;
