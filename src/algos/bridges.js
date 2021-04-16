/* Algorithm using modified DFS traversal to find all edges
that disconnect an UNDIRECTED graph (i.e. global bridges) */
const bridges = (g) => {
	let time = 0;

	// store edges that are bridges
	let bridges = {};
	// stores which nodes have been visited in DFS
	let visited = Set();
	// maps nodes to parent nodes in DFS tree
	let parent = {};
	// map nodes to discovery time
	let discovered = {};
	// map indicating whether some node discovered earlier
	// can be visited by subtree rooted at that node
	let low = {};

	g.adjList.forEach((values, node) => {
		if (!visited.has(node)) {
			dfsVisit(g, time, node, visited, discovered, low, parent, bridges);
		}
	});

	return bridges;
};

function dfsVisit(g, time, u, visited, discovered, low, parent, bridges) {
	time++;
	visited.add(u);
	discovered[u] = time;
	low[u] = time;

	const neighbors = g.adjList.get(u);
	neighbors.forEach((v, weight) => {
		if (!visited.has(v)) {
			parent[v] = u;
			dfsVisit(g, time, v, visited, discovered, low, parent, bridges);
			low[u] = Math.min(low[u], low[v]);

			if (low[v] > discovered[u]) {
				bridges.add({ node1: u, node2: v });
			}
		} else if (v !== parent[u]) {
			low[u] = Math.min(low[u], discovered[v]);
		}
	});
}

export default bridges;
