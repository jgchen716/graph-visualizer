const dijkstra = (g, start) => {
	const distances = new Map();
	const res = [];
	for (const node of g.adjList.keys()) {
		distances.set(node, Number.MAX_VALUE);
	}
	distances.set(start, 0);

	// max is number of keys
	let numIterations = 0;
	while (numIterations++ < g.adjList.size) {
		let minDist = Number.MAX_VALUE;
		let minNode = -1;
		distances.forEach((val, key) => {
			if (val < minDist) {
				minNode = key;
				minDist = val;
			}
		});
		res.push(minNode);
		distances.delete(minNode);
		g.adjList.get(minNode).forEach(({ node, weight }) => {
			distances.set(node, Math.min(distances.get(node), minDist + weight));
		});
	}
	return res;
};

export default dijkstra;
