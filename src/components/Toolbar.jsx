import React from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const Toolbar = ({
	selectedType,
	setSelectedType,
	selectedWeight,
	setSelectedWeight,
	setSelectedAlgorithm,
	setCleared,
	cleared,
}) => {
	// disable buttons based on current graph specifications
	const isDisabled = (alg) => {
		if (alg === "bfs" || alg === "dfs" || alg === "dijkstra") {
			return false;
		} else if (alg === "clustering" || alg === "bridges") {
			return selectedType !== "undirected";
		} else if (alg === "topo sort") {
			// need to check for cycles??
			return selectedType !== "directed";
		} else {
			return false;
		}
	};

	// manage radio button state
	const handleChange = (e, type) => {
		switch (type) {
			case "direction":
				setSelectedType(e.target.value);
				break;
			case "weight":
				setSelectedWeight(e.target.value);
				break;
			default:
				console.log("Invalid type");
				break;
		}
	};

	return (
		<div className="toolbar">
			<div className="button-group">
				<div className="btn">
					<Button
						variant="outlined"
						onClick={() => setSelectedAlgorithm("bfs")}
						disabled={isDisabled("bfs")}
					>
						BFS
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("dfs")}
						disabled={isDisabled("dfs")}
					>
						DFS
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("dijkstra")}
						disabled={isDisabled("dijkstra")}
					>
						Dijkstra
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("topo sort")}
						disabled={isDisabled("topo sort")}
					>
						Topo Sort
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("clustering")}
						disabled={isDisabled("clustering")}
					>
						Clustering Coefficient
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("bridges")}
						disabled={isDisabled("bridges")}
					>
						Bridges
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="outlined"
						onClick={(e) => setSelectedAlgorithm("triadic")}
						disabled={isDisabled("triadic")}
					>
						Triadic Closure
					</Button>
				</div>
				<div className="btn">
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setCleared(!cleared)}
					>
						CLEAR
					</Button>
				</div>
			</div>
			<FormControl component="fieldset">
				<RadioGroup
					aria-label="graph-type"
					name="controlled-radio-buttons-group"
					value={selectedType}
					onChange={(e) => handleChange(e, "direction")}
				>
					<FormControlLabel
						value="undirected"
						control={<Radio color="primary" />}
						label="Undirected"
					/>
					<FormControlLabel
						value="directed"
						control={<Radio color="primary" />}
						label="Directed"
					/>
				</RadioGroup>
			</FormControl>

			<FormControl component="fieldset">
				<RadioGroup
					aria-label="edge-type"
					name="controlled-radio-buttons-group"
					value={selectedWeight}
					onChange={(e) => handleChange(e, "weight")}
				>
					<FormControlLabel
						value="unweighted"
						control={<Radio color="primary" />}
						label="Unweighted"
					/>
					<FormControlLabel
						value="weighted"
						control={<Radio color="primary" />}
						label="Weighted"
					/>
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default Toolbar;
