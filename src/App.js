import logo from "./logo.svg";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  let g = new Graph();
  g.addNode("a");
  g.addNode("b");
  g.addEdge("a", "b", 1);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {g.render()}
      </header>
    </div>
  );
}

export default App;
