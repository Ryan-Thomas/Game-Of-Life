import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cell from "./cell";

// Takes an array, and returns the array without duplicates
function removeDuplicates(arr) {
	const ret = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr.indexOf(i) === -1) {
			ret.push(index);
		}
	}
	return ret;
}

// Takes an index of this.state.cells and returns the indexes
// of the cells which are considered adjacent to it.
// Cells in the top row connect to the bottom row and cells in
// the left column connect to the right column
// Also takes the length of one row of the Board, and the total
// number of cells in the board (this.state.cells.length in this case)
// The returned array may contain duplicates
function getAdjacents(p, rowLength, cells) {
	const i = p / rowLength;
	const j = p % rowLength;
	
	const adjI = [
		i - 1,
		i - 1,
		i - 1,
		i,
		i,
		i + 1,
		i + 1,
		i + 1,
	];
	const adjJ = [
		j - 1,
		j - 1,
		j - 1,
		j,
		j,
		j + 1,
		j + 1,
		j + 1,
	];
	
	// wrap around invalid indexes to connect to the other end of the array
	for (let i = 0; i < adjJ.length; i++) {
		if (adjJ[i] === -1) {
			adjJ[i] = rowLength - 1;
		}
		if (adjJ[i] === rowLength) {
			adjJ[i] = 0;
		}
	}
	
	const columnLength = cells / rowLength;
	for (let i = 0; i < adjJ.length; i++) {
		if (adjI[i] === -1) {
			adjI[i] = columnLength - 1;
		}
		if (adjI[i] === columnLength) {
			adjI[i] = 0;
		}
	}
	
	const adjacents = [];
	for (let i = 0; i < adjI.length; i++) {
		adjacents.push(adjI[i] * rowLength + adjJ[i]);
	}
	
	return adjacents;
}

// Takes an index corresponding to a cell in this.state.cells, and returns
// Whether that cell should be alive, dead, or empty on the next turn
function getNextState(index, n, oldState) {
	
	// Indexes of adjacent cells
	let adjIndexes = getAdjacents(index, n, this.state.cells.length);
	adjIndexes = removeDuplicates(adjIndexes, this.state.cells.length);
	
	// Current state of the cell
	const currentState = oldState[index];
	// If currentState is 0, the cell is dead
	// If currentState is 1, the cell is alive
	// If currentState is 2, the cell is alive and has 2 or 3 live neighbors
	
	// Iterate over the indexes of the adjacent cells to count the number that are are not empty
	let liveNeighbors = 0;
	for (let i = 0; i < adjIndexes.length; i++) {
		if (oldState[adjIndexes[i]] > 0) {
			liveNeighbors++;
		}
	}
	
	// If the cell is alive and has 2 or 3 neighbors, return 2
	if (currentState > 0 && (liveNeighbors === 2 || liveNeighbors === 3)) {
		return 2;
	}
	
	// If the cell is alive and does not have 2 or 3 neighbors, return 1
	if (currentState > 0) {
		return 1;
	}
	
	// If the cell is dead and has 3 neighbors, return 1
	if (liveNeighbors === 3) {
		return 1;
	}
	
	// Cell is dead
	return 0;
}

export default class Board extends React.Component {
	// Function that loops through the array, figures out which cells
	// will be alive next generation, and then sets new state
	update() {
		const nextState = [];
		for (let i = 0; i < this.state.cells.length; i++) {
			nextState[i] = getNextState(i, this.state.size, this.state.cells);
		}
		this.setState({
			cells: nextState,
		});
	}
	handleClick(index) {
		const oldCellStatus = this.state.cells[index];
		const newCells = this.state.cells;
		if (oldCellStatus === 0) {
			// If the cell that was clicked was dead, bring it to life
			newCells[index] = 1;
		} else {
			// If the cell that was clicked was alive, kill it
			newCells[index] = 0;
		}
		this.setState({
		    cell: newCells
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			cells: props.cells,
		};
		this.update = this.update.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	render() {
		const cells = [];
		for (let i = 0; i < this.props.size; i++) {
			let color = "";
			const status = this.state.cells[i];
			if (status === 0) {
				color = "white";
			} else if (status === 1) {
				color = "#5CB85C";
			} else {
				color = "green";
			}
			cells.push(
				<Cell color={color}
							key={i}
							handleClick={this.handleClick}
							index={i} />
			);
		}
		return (
			<div style={{ marginTop: "20px" }}>
				<h4>Placeholder</h4>
				{cells}
			</div>
		)
	}
}
Board.propTypes = {
	running: React.PropTypes.bool.isRequired, // Whether or not the sim is running
	size: React.PropTypes.number.isRequired, // number of squares in the grid
	speed: React.PropTypes.number.isRequired, // speed at which the sim is running
	rowLength: React.PropTypes.number.isRequired, // length of each row in the grid
	cells: React.PropTypes.array.isRequired, // the initial array of cell states
};
