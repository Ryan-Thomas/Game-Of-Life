import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cell from "./cell";

function calcBaseLength(windowWidth, rowLength) {
	let baseLength = null;
	// Determine the size of each square based on screen width
	for (let i = 10; i > 5 && baseLength === null; i--) {
		if (windowWidth > rowLength * (i + 0.5)) {
			baseLength = i + "px";
		}
	}
	if (baseLength === null) {
		baseLength = "5px";
	}
	return baseLength;
}


export default class Board extends React.Component {
	setBaseLength() {
		if (window.innerWidth < this.props.rowLength * (parseInt(this.state.baseLength) + 0.5) ||
			(this.state.baseLength !== "10px" && window.innerWidth > this.props.rowLength * (parseInt(this.state.baseLength + 1.5)))) {
			
			this.setState({
				baseLength: calcBaseLength(window.innerWidth, this.props.rowLength),
			});
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			baseLength: "10px",
		};
		this.setBaseLength = this.setBaseLength.bind(this);
		window.addEventListener("resize", this.setBaseLength);
	}
	render() {
		const cells = [];
		const rows = this.props.size / this.props.rowLength;
		let index = -1;
		
		let baseLength = calcBaseLength(window.innerWidth, this.props.rowLength);
		
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < this.props.rowLength; j++) {
				index++;
				let color = "";
				const status = this.props.cells[index];
				if (status === 0) {
					color = "white";
				} else if (status === 1) {
					color = "#33cc33";
				} else {
					color = "#009933";
				}
				cells.push(
					<Cell color={color}
								key={index}
								handleClick={this.props.handleClick}
								index={index}
								baseLength={baseLength}/>
				);
			}
			cells.push(<br key={0 - index}/>);
		}
		return (
			<div style={{
				marginTop: "20px",
				fontSize: "0px",
				backgroundColor: "darkgrey",
				padding: "10px",
				borderRadius: "10px",
				display: "inline-block",
			}}>
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
	updateCells: React.PropTypes.func.isRequired, // update the cells of the Game component
	handleClick: React.PropTypes.func.isRequired, // function for when a cell is clicked
};
