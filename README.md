# Read Me

## Application

This project can be found [here](https://jgchen716.github.io/graph-visualizer/) and [here](https://jgchen.cis188.org/).

## Overview

This project is a containerized graph visualizer web app built in React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app) that allows users to add nodes and edges to a canvas and then perform a number of algorithms on the graph they've created.

The algorithms include traditional graph algorithms like BFS, DFS, and Dijkstra's shortest path algorithm, but also include some properties that are useful when analyzing social networks such as clustering coefficient for a given node and triadic closure (shows edges that would likely form based on triadic closure).

Once run, the results of each algorithm are displayed in a "results" pane on the right side of the screen. The written output varies for each algorithm—for example, running BFS from a given node will display each of the layers/frontiers of the BFS traversal.

The goal of this project is to allow users to visually analyze and thus understand various properties of graphs and social networks.

## How to Use the Project

To add nodes, double click on the canvas. To select a node, single click on a node. To add edges, a node must be selected. Once a starting node is selected, holding shift while single clicking on another node creates an edge between these two nodes. Edge weights can be change by first selecting the edge, hitting `enter` to reset the edge weight to 0, and then typing in digits that correspond to the edge weight.

## Contributors

This project was created and is maintained by [Jonathan Chen](https://github.com/jgchen716) and [Jeffrey Xiao](https://github.com/jxiao).
