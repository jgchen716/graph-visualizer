// start - node to start DFS from
// only visits nodes reachable from start (NOT full traversal)
const dfs = (g, start) => {
	// stack for iterative DFS
	const stack = [];
	// array of nodes to return
	const result = [];
	// set of discovered nodes
	const discovered = new Set();
	// initialize by adding start node
	stack.push(start);

	while (stack.length !== 0) {
		// pop stack, look at node's neighbors
		const curr = stack.pop();
		const outneighbors = g.adjList.get(curr);

		// if we haven't seen this node, add the node
		if (!discovered.has(curr)) {
			result.push(curr);
			discovered.add(curr);
		}

		// add each neighbor of current node to stack
		outneighbors.forEach(({ node, weight }) => {
			if (!discovered.has(node)) {
				stack.push(node);
			}
		});
	}

	return result;
};

export default dfs;
