import {useRef} from "react"
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "./Register.css"
import { registerUser } from "../../actions/authActions"
import { setAlert } from "../../actions/alertActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"

const Register = ({ auth: { isAuthenticated }, registerUser, setAlert}) => {
	
	const emailRef = useRef();
	const nameRef = useRef();
	const password1Ref = useRef();
	const password2Ref = useRef();
	
	const onSubmitHandler = async(event) => {
		event.preventDefault();
		if(password1Ref.current.value !== password2Ref.current.value){
			setAlert("Passwords do not match", "danger")
		}else{
			registerUser(nameRef.current.value, emailRef.current.value, password1Ref.current.value)
		}
		
	}
	
// 	If user is authenticated, redirect to different page
	if(isAuthenticated){
		return <Navigate replace to="/" />
	}	
	
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
						<Form onSubmit={onSubmitHandler}>
							<Form.Group className="mb-3" controlId="formName">
								<Form.Label>Full Name</Form.Label>
								<Form.Control ref={nameRef} type="text" placeholder="Full Name" />
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control ref={emailRef} type="email" placeholder="Email Address" />
								<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formPassword1">
								<Form.Label>Password</Form.Label>
								<Form.Control ref={password1Ref} type="password" placeholder="Password" />
							</Form.Group>
							
							<Form.Group className="mb-3" controlId="formPassword2">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control ref={password2Ref} type="password" placeholder="Confirm Password" />
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

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.authReducer
})

export default connect(mapStateToProps, {setAlert, registerUser})(Register);