import React, { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import Toolbar from "./components/Toolbar";

function App() {
	// state for undirected vs directed graph
	const [selectedType, setSelectedType] = useState("undirected");
	// state for unweighted vs weighted graph
	const [selectedWeight, setSelectedWeight] = useState("unweighted");
	// state for selected algorithm
	const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
	// state for whether or not graph is cleared
	const [cleared, setCleared] = useState(false);

	return (
		<div className="app">
			<Graph
				selectedType={selectedType}
				selectedWeight={selectedWeight}
				selectedAlgorithm={selectedAlgorithm}
				cleared={cleared}
			/>
			<Toolbar
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				selectedWeight={selectedWeight}
				setSelectedWeight={setSelectedWeight}
				setSelectedAlgorithm={setSelectedAlgorithm}
				cleared={cleared}
				setCleared={setCleared}
			/>
		</div>
	);
}

export default App;
