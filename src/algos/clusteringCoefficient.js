// INVARIANT: only works for UNDIRECTED graph
// calculates clustering coefficient for given node
const clusteringCoefficient = (g, node) => {
	const neighbors = g.adjList.get(node);
	const numNeighbors = neighbors.length;
	// calculates total possible nummber of pairs, i.e. n choose 2
	const numPairs = factorial(numNeighbors) / (factorial(numNeighbors - 2) * 2);

	// for each pair of nodes, check to see if there is edge between
	let count = 0;
	for (var i = 0; i < neighbors.length; i++) {
		for (var j = 0; j < neighbors.length; j++) {
			if (i !== j) {
				const nodes = g.adjList.get(i);
				for (var k = 0; k < nodes.length; k++) {
					if (nodes[k] === j) {
						count++;
					}
				}
			}
		}
	}

	// divide by 2 b/c undirected
	const numEdges = count / 2;
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
