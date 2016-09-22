import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default class BottomControls extends React.Component {
	render() {
		// Set the color of the activated buttons to green
		let sizeSmallClass = "btn";
		let sizeMedClass = "btn";
		let sizeLargeClass = "btn";
		
		switch(this.props.size) {
			case 1500:
				sizeSmallClass += " btn-success";
				break;
			case 3500:
				sizeMedClass += " btn-success";
				break;
			default:
				sizeLargeClass += " btn-success";
				break;
		}
		
		let speedSlowClass = "btn ";
		let speedMedClass = "btn ";
		let speedFastClass = "btn ";
		
		switch(this.props.speed) {
			case 1:
				speedSlowClass += " btn-success";
				break;
			case 0.3:
				speedMedClass += " btn-success";
				break;
			default:
				speedFastClass += " btn-success";
				break;
		}
		
		return (
			<div style={{ marginTop: "20px", textAlign: "center" }}>
				<div style={{ display: "inline-block", marginBottom: "20px"}}>
					{/*Top Row*/}
					<div id="board-controls" style={{ overflow: "hidden" }}>
						<h4 style={{ display: "inline", marginRight: "10px", float:"left" }}>
							<span className="label label-info">Board Size: {this.props.generation}</span>
						</h4>
						<div style={{ float: "right", display: "inlineBlock" }}>
							<button className={sizeSmallClass} onClick={() => this.props.setSize(1500, 50)}>50x30</button>
							<button className={sizeMedClass} onClick={() => this.props.setSize(3500, 70)}>70x50</button>
							<button className={sizeLargeClass} onClick={() => this.props.setSize(8000, 100)}>100x80</button>
						</div>
						<div style={{ clear: "both" }} ></div>
					</div>
					{/*Bottom Row*/}
					<div id="speed-controls" style={{ marginTop: "20px" }}>
						<h4 style={{ display: "inline", marginRight: "10px", float: "left" }}>
							<span className="label label-info">Simulation Speed: {this.props.generation}</span>
						</h4>
						<div style={{ float: "right", display: "inlineBlock" }}>
							<button className={speedSlowClass} onClick={() => this.props.setSpeed(1)}>Slow</button>
							<button className={speedMedClass} onClick={() => this.props.setSpeed(0.3)}>Medium</button>
							<button className={speedFastClass} onClick={() => this.props.setSpeed(0.1)}>Fast</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
BottomControls.propTypes = {
	speed: React.PropTypes.number.isRequired,
	setSpeed: React.PropTypes.func.isRequired,
	size: React.PropTypes.number.isRequired,
	setSize: React.PropTypes.func.isRequired,
};
