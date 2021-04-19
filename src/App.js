import "./App.css";
import Graph from "./components/Graph";
import Toolbar from "./components/Toolbar";
import Results from "./components/Results";

function App() {
  return (
    <div className="app">
      <Graph />
      <Toolbar />
      <Results />
    </div>
  );
}

export default App;
