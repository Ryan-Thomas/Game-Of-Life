import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Header from "./header";
import Game from "./game";

// DO NOT REMOVE THIS OR ALL THE CSS FROM index.scss WILL STOP WORKING
//noinspection ES6UnusedImports
import styles from '../index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
				<Header />
				<Game />
      </div>
    )
  }
}
