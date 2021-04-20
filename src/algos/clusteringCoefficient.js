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
  const numNeighbors = neighbors.length;
  // calculates total possible nummber of pairs, i.e. n choose 2
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

  // divide by 2 b/c undirected
  const numEdges = count / 2.0;
  return numEdges / numPairs;
};

// calculates factorial
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
