// returns a Set of obj {NodeA, NodeB}, which represents edges formed
// Note: if edge forms between NodeA and NodeB, output set will contain
// {NodeA, NodeB} and {NodeB, NodeA}
const triadicClosure = (g) => {
  const res = new Set();

  /* 
    Iterate through neighbors of A and B.
    If node A and node B share a neighbor, 
    by triadic closure, an edge between A 
    and B will likely form, so add it to set. 
   */
  g.adjList.forEach((neighborsA, nodeA) => {
    g.adjList.forEach((neighborsB, nodeB) => {
      if (
        nodeA !== nodeB &&
        shareNeighbor(neighborsA, neighborsB) &&
        !includesNode(
          neighborsA,
          nodeB
        ) /* nodeA's neighbors does not include nodeB */
      ) {
        res.add({ NodeA: nodeA, NodeB: nodeB });
      }
    });
  });
  return res;
};

// check if list of neighbors includes node
const includesNode = (neighborsA, nodeB) => {
  var included = false;
  neighborsA.forEach(({ node: nodeA, weight }) => {
    if (nodeA === nodeB) {
      included = true;
    }
  });
  return included;
};

// check if two nodes have a common neighbor
const shareNeighbor = (neighborsA, neighborsB) => {
  var shared = false;
  neighborsA.forEach((neighborA) => {
    if (neighborsB.some((neighborB) => neighborA.node === neighborB.node)) {
      shared = true;
    }
  });
  return shared;
};

export default triadicClosure;
