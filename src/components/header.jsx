import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cell from "./cell";

export default class Header extends React.Component {
	getInfo() {
		const url = "https://www.math.cornell.edu/~lipa/mec/lesson6.html";
		window.open(url, "_blank");
	}
	constructor(props) {
		super(props);
		this.getInfo = this.getInfo.bind(this);
	}
	render() {
		return (
			<div className="header"
					 style={{
						 textAlign: "center",
						 marginTop: "20px",
					 }} >
				<h3 onClick={this.getInfo} >
					ReactJS Game of Life (Click to Learn More)
				</h3>
				<h4>by Ryan Thomas</h4>
			</div>
		)
	}
}

