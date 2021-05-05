// INVARIANT: only works for UNDIRECTED graph
// calculates clustering coefficient for given node
const clusteringCoefficient = (g) => {
  const res = [];

  g.adjList.forEach((neighbors, node) => {
    res.push({ node: node, cc: clusteringIndividual(g, node) });
  });
  return res;
};

const clusteringIndividual = (g, node) => {
  const neighbors = g.adjList.get(node);
  // number of edges between neighbors
  const numNeighbors = neighbors.length;
  // calculates total possible number of pairs, i.e. n choose 2
  const numPairs = factorial(numNeighbors) / (factorial(numNeighbors - 2) * 2);

  // for each pair of nodes, check to see if there is edge between
  let count = 0;
  neighbors.forEach(({ node: neighborId, weight }) => {
    neighbors.forEach(({ node: neighborId2, weight2 }) => {
      if (neighborId !== neighborId2) {
        const nodes = g.adjList.get(neighborId);
        nodes.forEach(({ node: neighborId3, weight3 }) => {
          count += neighborId3 === neighborId2 ? 1 : 0;
        });
      }
    });
  });

  // divide by 2 if undirected
  const numEdges = count / (g.state.undirected ? 2.0 : 1.0);
  return numEdges / numPairs;
};

// calculates factorial, used in calculation of all possible pairs
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  for (var i = num - 1; i > 0; i--) {
    num *= i;
  }
  return num;
}

export default clusteringCoefficient;
