// INVARIANT: assumes undirected graph
// returns a Set of obj {NodeA, NodeB}, which represents edges formed
// Note: if edge forms between NodeA and NodeB, output set will contain
// {NodeA, NodeB} and {NodeB, NodeA}
const triadicClosure = (g) => {
	const res = new Set();

	console.log(g);
	console.log(g.adjList.keys());
	g.adjList.keys().forEach((nodeA) => {
		g.adjList.keys().forEach((nodeB) => {
			if (nodeA !== nodeB && shareNeighbor(g, nodeA, nodeB)) {
				res.add({ NodeA: nodeA, NodeB: nodeB });
			}
		});
	});

	return res;
};

const shareNeighbor = (g, nodeA, nodeB) => {
	const neighborsA = g.adjList.get(nodeA);
	const neighborsB = g.adjList.get(nodeB);
	neighborsA.forEach((neighborA) => {
		if (neighborsB.includes(neighborA)) {
			return true;
		}
	});
	return false;
};

export default triadicClosure;
