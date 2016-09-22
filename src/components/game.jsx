import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import TopControls from "./topcontrols";
import BottomControls from "./bottomcontrols";
import Board from "./board.jsx";

export default class Game extends React.Component {
	handleRun() {
		console.log("run");
		this.setState({
			running: true,
		});
	}
	handlePause() {
		console.log("pause");
		this.setState({
			running: false,
		});
	}
	handleClear() {
		console.log("clear");
	}
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			size: 1500,
			speed: 1,
			rowLength: 50,
		};
		this.handleRun = this.handleRun.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}
	render() {
		const cells = [];
		for (let i = 0; i < this.state.size; i++) {
			cells.push(0);
		}
		return (
			<div style={{
				textAlign: "center",
			}}>
				<TopControls running={this.state.running}
										 handleRun={this.handleRun}
										 handlePause={this.handlePause}
										 handleClear={this.handleClear}
										 generation={0} />
				<Board running={this.state.running}
							 size={this.state.size}
							 speed={this.state.speed}
							 cells={cells}
							 rowLength={this.state.rowLength}/>
				<BottomControls />
			</div>
		)
	}
}
