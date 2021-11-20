import React, { Fragment } from "react"
import './App.css';
import NavigationBar from "./components/Layout/NavigationBar"

const App = () => {
  return (
    <Fragment className="App">  
		<NavigationBar />
		  <h1>App</h1> 
	</Fragment>
  );
}

export default App;
