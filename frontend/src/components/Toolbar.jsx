import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// bottom toolbar for running algorithms, clearing graph, and viewing instructions
const Toolbar = ({
  selectedType,
  setSelectedType,
  selectedWeight,
  setSelectedWeight,
  setSelectedAlgorithm,
  setCleared,
  cleared,
}) => {
  const instructionsText = (
    <>
      Double click to add a node. Single click to select a node or edge.
      <br />
      After selecting a node, shift click on another node to add an edge.
      <br />
      To delete a node or edge, select the node/edge and then hit the{" "}
      <code>backspace</code> or <code>delete</code> key on your keyboard.
      <br />
      <br />
      The default edge weight is 1. To change an edge weight, first press{" "}
      <code>enter</code> to set the edge weight to 0. Then, type in any number
      to append the digits to the edge weight.
      <br />
      <br />
      Also, note that for some algorithms (BFS, DFS, and Dijkstra), a node must
      be selected in order to run the algorithm. Once run, the algorithm's
      results will be displayed in the Results pane on the right side of the
      screen.
      <br />
      Hit save to save your favorite graph!
    </>
  );

  // state for dialog box for instructions
  const [open, setOpen] = useState(false);

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // disable buttons based on current graph specifications
  const isDisabled = (alg) => {
    if (
      alg === "bfs" ||
      alg === "dfs" ||
      alg === "dijkstra" ||
      alg === "clustering"
    ) {
      return false;
    } else if (alg === "bridges") {
      return selectedType !== "undirected";
    } else if (alg === "topo sort") {
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

  // render toolbar
  return (
    <div className="toolbar">
      <div className="button-group">
        <div className="btn">
          <Button variant="contained" onClick={handleClickOpen}>
            Instructions
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Instructions"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {instructionsText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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
            onClick={() => {
              setCleared(!cleared);
              setSelectedAlgorithm("");
            }}
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
