// calculates shortest paths from start node to ALL other nodes via Dijkstra's algorithm
const dijkstra = (g, start) => {
	// map to store current distances from start node
	const distances = new Map();
	// store each node with its minimum distance from the start
	const res = [];
	// initialize distances to infinity for all nodes except start
	g.adjList.forEach((value, node) => distances.set(node, Number.MAX_VALUE));
	distances.set(start, 0);

	// max is number of keys
	let numIterations = 0;
	const maxSize = g.adjList.size;
	while (numIterations++ < maxSize) {
		let minDist = Number.MAX_VALUE;
		let minNode = -1;
		distances.forEach((val, key) => {
			// update minimum distance and node
			if (val < minDist) {
				minNode = key;
				minDist = val;
			}
		});
		if (minNode >= 0) {
			res.push({ node: minNode, distance: minDist });
			distances.delete(minNode);
			// update distance if less than running minimum distance
			g.adjList.get(minNode).forEach(({ node, weight }) => {
				distances.set(node, Math.min(distances.get(node), minDist + weight));
			});
		}
	}
	return res;
};

export default dijkstra;
