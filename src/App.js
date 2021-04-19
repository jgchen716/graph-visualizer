import React, { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import Toolbar from "./components/Toolbar";
import Results from "./components/Results";

function App() {
  // state for undirected vs directed graph
  const [selectedType, setSelectedType] = useState("undirected");
  // state for unweighted vs weighted graph
  const [selectedWeight, setSelectedWeight] = useState("unweighted");
  return (
    <div className="app">
      <Graph selectedType={selectedType} selectedWeight={selectedWeight} />
      <Toolbar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedWeight={selectedWeight}
        setSelectedWeight={setSelectedWeight}
      />
      <Results />
    </div>
  );
}

export default App;
