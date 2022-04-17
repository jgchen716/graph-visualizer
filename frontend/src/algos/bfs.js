// performs full BFS traversal from given start node
const bfs = (g, start) => {
	const seen = new Set();
	// queue for BFS
	let queue = [start];
	// list of lists to store each layer/frontier of BFS traversal
	let res = [];
	// while queue is not empty, proceed
	while (queue.length !== 0) {
		// add current layer/frontier
		res.push([...queue]);
		let tempQueue = [];
		// mark all parents as seen / discovered
		queue.forEach((parent) => {
			seen.add(parent);
		});
		// add next layer/frontier of nodes to queue if we haven't seen it already
		queue.forEach((parent) => {
			g.adjList.get(parent).forEach(({ node, weight }) => {
				if (!tempQueue.includes(node) && !seen.has(node)) {
					tempQueue.push(node);
				}
			});
		});
		// update queue
		queue = [...tempQueue];
	}
	return res;
};

export default bfs;
