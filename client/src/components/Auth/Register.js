import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "./Register.css"

const Register = () => {
	return(
		<Container>
			<Row className="text-center mb-5">
				<Col>
					<h1>Sign Up</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<div>
						<Form>
							<Form.Group className="mb-3" controlId="formName">
								<Form.Label>Full Name</Form.Label>
								<Form.Control type="text" placeholder="Full Name" />
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="email" placeholder="Email Address" />
								<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPassword1">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="formPassword2">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control type="password" placeholder="Confirm Password" />
							</Form.Group>

							<Button variant="primary" className="my-2" type="submit">Register</Button>
							<p>Alreay have an account? <Link to="/login">Sign In</Link></p>
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Register;