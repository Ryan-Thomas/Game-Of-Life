import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default class TopControls extends React.Component {
	render() {
		let runButtonText = "btn ";
		let pauseButtonText = "btn ";
		if (this.props.running) {
			runButtonText += "btn-success";
			pauseButtonText += "btn-default"
		} else {
			runButtonText += "btn-default";
			pauseButtonText += "btn-success"
		}
		return (
			<div style={{
				marginTop: "20px",
			}}>
				<button className={runButtonText} onClick={this.props.handleRun}>Run</button>
				<button className={pauseButtonText} onClick={this.props.handlePause}>Pause</button>
				<button className="btn btn-danger" onClick={this.props.handleClear}>Clear</button>
				<h4 style={{display: "inline", marginLeft: "10px" }}>
					<span className="label label-info">Generation: {this.props.generation}</span>
				</h4>
				<br />
				<button className="btn btn-primary btn-lg"
								onClick={this.props.randomize}
								style={{ marginTop: "20px" }} >
					Randomize!
				</button>
				<h4 style={{ marginTop: "20px" }}>Click cells to switch them on or off</h4>
				<h4>Have fun! :D</h4>
			</div>
		)
	}
}
TopControls.propTypes = {
	running: React.PropTypes.bool.isRequired,
	handleRun: React.PropTypes.func.isRequired,
	handlePause: React.PropTypes.func.isRequired,
	handleClear: React.PropTypes.func.isRequired,
	generation: React.PropTypes.number.isRequired,
	randomize: React.PropTypes.func.isRequired,
};
