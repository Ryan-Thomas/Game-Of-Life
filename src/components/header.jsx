import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cell from "./cell";

export default class Header extends React.Component {
	getInfo() {
		const url = "https://www.math.cornell.edu/~lipa/mec/lesson6.html";
		window.open(url, "_blank");
	}
	getUser() {
		const url = "https://github.com/ryan-thomas";
		window.open(url, "_blank");
	}
	constructor(props) {
		super(props);
		this.getInfo = this.getInfo.bind(this);
		this.getUser = this.getUser.bind(this);
	}
	render() {
		return (
			<div className="header"
					 style={{
						 textAlign: "center",
						 marginTop: "20px",
					 }} >
				<h3>
					ReactJS Game of Life
					<button className="btn btn-info" onClick={this.getInfo}>Click to Learn More</button>
				</h3>
				<button className="btn btn-link btn-lg" onClick={this.getUser}>By Ryan Thomas</button>
			</div>
		)
	}
}

