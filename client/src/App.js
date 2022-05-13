import {Fragment} from "react"
import './App.css';
import NavigationBar from "./components/Layout/NavigationBar"
import Landing from "./components/Layout/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AlertComp from "./components/Layout/Alert"
import Profile from "./components/Profile/Profile"
import CreateUpdateProfile from "./components/Profile/CreateUpdateProfile"
import Jurnals from "./components/Profile/Jurnals"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute"
// Redux
import { Provider } from "react-redux";
import store from "./store"


const App = () => {
  return (
	<Provider store={store}>
		<Fragment>
			<Router>
				<NavigationBar />
				<AlertComp />
					<Routes>
						<Route path="/" element={<Landing />}/>
						<Route path="/login" element={<Login />}/>
						<Route path="/register" element={<Register />}/>
						<Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>}></Route>
						<Route path="/update-profile" element={<PrivateRoute> <CreateUpdateProfile /> </PrivateRoute>}></Route>
						<Route path="/jurnal" element={<PrivateRoute> <Jurnals /> </PrivateRoute>}></Route>
						<Route path="/jurnal/:jurnalId" element={<PrivateRoute> <Jurnals /> </PrivateRoute>}></Route>
					</Routes>
			</Router>
		</Fragment>
	</Provider>
  );
}

export default App;
