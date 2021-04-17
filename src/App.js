import "./App.css";
import Canvas from "./components/Canvas";
import Graph from "./components/Graph";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="App">
      <Graph />
      <Toolbar />
    </div>
  );
}

export default App;
