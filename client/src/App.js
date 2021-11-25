import {Fragment} from "react"
import './App.css';
import NavigationBar from "./components/Layout/NavigationBar"
import Landing from "./components/Layout/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store"

const App = () => {
  return (
	<Provider store={store}>
		<Fragment>
			<NavigationBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="/register" element={<Register />}/>
				</Routes>
			</BrowserRouter>
		</Fragment>
	</Provider>
  );
}

export default App;
