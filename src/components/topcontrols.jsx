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
};
