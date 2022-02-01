import {useRef} from "react"
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom"
import "./Login.css"
import "bootstrap/dist/css/bootstrap.css"
import {setAlert} from "../../actions/alertActions"
import {loginUser} from "../../actions/authActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"


const Login = ({setAlert, loginUser, auth: {isAuthenticated} }) => {
	
	const emailRef = useRef();
	const passwordRef = useRef();
	
	const onSubmit = async(event) => {
		event.preventDefault();
		
		loginUser(emailRef.current.value, passwordRef.current.value)
		
	}
	
	if(isAuthenticated){
		return <Navigate replace to="/" />
	}
	
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
						<Form onSubmit={onSubmit}>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control ref={emailRef} type="email" placeholder="Email Address" />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control ref={passwordRef} type="password" placeholder="Password" />
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

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}
	
const mapStateToProps = state => ({
	auth: state.authReducer
})

export default connect(mapStateToProps, {setAlert, loginUser} )(Login);