const bfs = (g, start) => {
	const seen = new Set();
	let queue = [start];
	let res = [];
	while (queue.length !== 0) {
		res.push([...queue]);
		let tempQueue = [];
		queue.forEach((parent) => {
			seen.add(parent);
		});
		queue.forEach((parent) => {
			g.adjList.get(parent).forEach(({ node, weight }) => {
				if (!tempQueue.includes(node) && !seen.has(node)) {
					tempQueue.push(node);
				}
			});
		});
		queue = [...tempQueue];
	}
	return res;
};

export default bfs;
