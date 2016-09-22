import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default class Cell extends React.Component {
	handleClick() {
		this.props.handleClick(this.props.index);
	}
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	render() {
		return (
			<div onClick={this.handleClick}
					 style={{
						 width: this.props.baseLength,
						 height: this.props.baseLength,
						 backgroundColor: this.props.color,
						 display: "inline-block",
						 borderLeft: "1px solid darkgrey",
						 borderTop: "1px solid darkgrey",
					 }}>
			
			</div>
		)
	}
}
Cell.propTypes = {
	color: React.PropTypes.string.isRequired,
	handleClick: React.PropTypes.func.isRequired,
	index: React.PropTypes.number.isRequired,
	baseLength: React.PropTypes.string.isRequired,
};
