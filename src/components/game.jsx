import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import TopControls from "./topcontrols";
import BottomControls from "./bottomcontrols";
import Board from "./board.jsx";

// Takes an array, and returns the array without duplicates
function removeDuplicates(arr) {
	const ret = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr.indexOf(i) === -1) {
			ret.push(arr[i]);
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
function getAdjacents(p, rowLength, cellsLength) {
	const i = Math.floor(p / rowLength);
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
		j,
		j + 1,
		j - 1,
		j + 1,
		j - 1,
		j,
		j + 1,
	];
	
	for (let i = 0; i < adjI.length; i++) {
		adjI[i] = Math.round(adjI[i]);
		adjJ[i] = Math.round(adjJ[i]);
	}
	
	// wrap around invalid indexes to connect to the other end of the array
	for (let i = 0; i < adjJ.length; i++) {
		if (adjJ[i] === -1) {
			adjJ[i] = rowLength - 1;
		}
		if (adjJ[i] === rowLength) {
			adjJ[i] = 0;
		}
	}
	
	const columnLength = cellsLength / rowLength;
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
		adjacents.push(Math.round(adjI[i] * rowLength + adjJ[i]));
	}
	
	return adjacents;
}

// Takes an index corresponding to a cell in this.state.cells, and returns
// Whether that cell should be alive, dead, or empty on the next turn
function getNextState(index, rowLength, oldCells) {
	// Indexes of adjacent cells
	let adjIndexes = getAdjacents(index, rowLength, oldCells.length);
	
	// Current state of the cell
	const currentState = oldCells[index];
	// If currentState is 0, the cell is dead
	// If currentState is 1, the cell is alive
	// If currentState is 2, the cell is alive and has 2 or 3 live neighbors
	
	// Iterate over the indexes of the adjacent cells to count the number that are are not empty
	let liveNeighbors = 0;
	for (let i = 0; i < adjIndexes.length; i++) {
		if (oldCells[adjIndexes[i]] > 0) {
			liveNeighbors++;
		}
	}
	
	// If the cell is alive and has 2 or 3 neighbors, return 2
	if (currentState > 0 && (liveNeighbors === 2 || liveNeighbors === 3)) {
		return 2;
	}
	
	// If the cell is dead and has 3 neighbors, return 1
	if (liveNeighbors === 3) {
		return 1;
	}
	
	// Cell is dead
	return 0;
}

// Function to redirect user to Github repo for this project
function openGithub() {
	const url = "https://github.com/Ryan-Thomas/Game-Of-Life";
	window.open(url, "_blank");
}

export default class Game extends React.Component {
	randomize() {
		const cells = [];
		for (let i = 0; i < this.state.cells.length; i++) {
			let state = Math.floor(Math.random() * 7);
			if (state > 2) {
				state = 0;
			}
			cells.push(state);
		}
		this.setState({
			cells,
		});
	}
	componentWillMount() {
		this.randomize();
	}
	setSize(size, rowLength) {
		if (size !== this.state.size) {
			this.handleClear();
			const cells = [];
			for (let i = 0; i < this.state.cells.length && i < size; i++) {
				cells.push(this.state.cells[i]);
			}
			for (let i = this.state.cells.length; i < size; i++) {
				cells.push(0);
			}
			this.setState({
				size,
				rowLength,
				cells,
			});
		}
	}
	update() {
		const nextCells = [];
		for (let i = 0; i < this.state.cells.length; i++) {
			nextCells[i] = getNextState(i, this.state.rowLength, this.state.cells);
		}
		this.setState({
			cells: nextCells,
			generation: this.state.generation + 1,
		});
	}
	runGame() {
		this.setState({
			running: true,
		});
		setTimeout(() => {
			if (this.state.running) {
				this.update();
				this.runGame();
			}
		}, this.state.speed * 1000);
	}
	handleRunClick() {
		// If the button is clicked while the game is running, nothing should happen
		if (!this.state.running) {
			this.runGame();
		}
	}
	handlePause() {
		this.setState({
			running: false,
		});
	}
	setSpeed(speed) {
		this.setState({
			speed,
		});
	}
	handleClear() {
		const cells = [];
		for (let i = 0; i < this.state.size; i++) {
			cells.push(0);
		}
		this.setState({
			running: false,
			cells,
			generation: 0,
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
			cells: newCells
		});
	}
	updateCells(cells) {
		this.setState({
			cells,
		});
	}
	constructor(props) {
		super(props);
		const cells = [];
		const size = 3500;
		for (let i = 0; i < size; i++) {
			cells.push(0);
		}
		this.state = {
			running: false,
			size,
			speed: 0.3,
			rowLength: 70,
			cells,
			generation: 0,
		};
		this.handleRunClick = this.handleRunClick.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.updateCells = this.updateCells.bind(this);
		this.update = this.update.bind(this);
		this.runGame = this.runGame.bind(this);
		this.setSpeed = this.setSpeed.bind(this);
		this.setSize = this.setSize.bind(this);
		this.randomize = this.randomize.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
	}
	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<TopControls running={this.state.running}
										 handleRun={this.handleRunClick}
										 handlePause={this.handlePause}
										 handleClear={this.handleClear}
										 generation={this.state.generation}
										 randomize={this.randomize} />
				<Board running={this.state.running}
							 size={this.state.size}
							 speed={this.state.speed}
							 cells={this.state.cells}
							 rowLength={this.state.rowLength}
							 updateCells={this.updateCells}
							 handleClick={this.handleClick} />
				<BottomControls setSpeed={this.setSpeed}
												setSize={this.setSize}
												speed={this.state.speed}
												size={this.state.size} />
				<button className="btn btn-link btn-large"
								onClick={openGithub} style={{ marginBottom: "30px" }} >
					Github Repository
				</button>
			</div>
		)
	}
}
