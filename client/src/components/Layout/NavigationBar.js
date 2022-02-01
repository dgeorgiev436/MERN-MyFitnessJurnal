import React, {Fragment} from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Navbar, Nav, Container} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {logoutUser} from "../../actions/authActions";
import { Link } from "react-router-dom"

const NavigationBar = ({logoutUser, auth: {isAuthenticated, loading, user} }) => {
	
	const notAuthenticated = 
	<Nav className="ms-auto">
		<Link className="nav-link" to="/login">Login</Link>
		<Link className="nav-link" to="/register">Register</Link>
	</Nav>
		  
	const authenticated = 
	<Nav className="ms-auto">
		<Link className="nav-link" to="/profile">{user && user.email}</Link>
		<Link onClick={logoutUser} className="nav-link" to="/">Logout</Link>
	</Nav>
	
	return (
		<Fragment>
			<Navbar collapseOnSelect fixed="top" expand="md" bg="dark" variant="dark">
			<Container>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Link className="navbar-brand" to="/">MyFitnessJurnal</Link>
							<Nav className="container-fluid">
							  <Link className="nav-link" to="#home">Home</Link>
							  <Link className="nav-link" to="#features">Features</Link>
							  <Link className="nav-link" to="#pricing">Pricing</Link>
							</Nav>
							{isAuthenticated ? authenticated : notAuthenticated}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	auth: state.authReducer
})

NavigationBar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {logoutUser} )(NavigationBar);