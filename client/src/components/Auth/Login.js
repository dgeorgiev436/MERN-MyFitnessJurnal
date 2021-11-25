import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom"
import "./Login.css"
import "bootstrap/dist/css/bootstrap.css"

const Login = () => {
	return(
		<Container>
			<Row className="text-center mb-5">
				<Col>
					<h1>Sign In</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<div>
						<Form>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="email" placeholder="Email Address" />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>

							<Button variant="primary" className="my-2" type="submit">Login</Button>
							<p>Don't have an account? <Link to="/register">Sign Up</Link></p>
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Login;