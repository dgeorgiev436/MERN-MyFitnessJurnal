import React, {Fragment} from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Navbar, Nav, Container} from "react-bootstrap";

const NavigationBar = () => {
	return (
		<Fragment>
			<Navbar collapseOnSelect fixed="top" expand="md" bg="dark" variant="dark">
			<Container>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Navbar.Brand className="" href="/">MyFitnessJurnal</Navbar.Brand>
							<Nav className="container-fluid">
							  <Nav.Link href="#home">Home</Nav.Link>
							  <Nav.Link href="#features">Features</Nav.Link>
							  <Nav.Link href="#pricing">Pricing</Nav.Link>
							</Nav>
							<Nav className="ms-auto">
								<Nav.Link href="/login">Login</Nav.Link>
								<Nav.Link href="/register">Register</Nav.Link>
							</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Fragment>
	)
}

export default NavigationBar;