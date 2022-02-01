import {connect} from "react-redux"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"
import {Fragment, useRef} from "react"
import {createAndUpdateProfile} from "../../actions/profileActions"
import {Link, useNavigate } from "react-router-dom"


const CreateUpdateProfile = ({createAndUpdateProfile, profile}) => {
	
	const navigate = useNavigate();

	const ageRef = useRef();
	const genderRef = useRef();
	const aboutRef = useRef();
	const inspirationRef = useRef();
	const purposeRef = useRef();
	
	const submitHandler = (event) => {
		
		event.preventDefault();
		
		createAndUpdateProfile(
			ageRef.current.value,
			genderRef.current.value,
			aboutRef.current.value,
			inspirationRef.current.value,
			purposeRef.current.value
		)
		
		navigate("/profile")
	}
	
	
	
	return (
		<Fragment>
			<h1 className="text-center">Update Profile</h1>
			<div className="container h-100">
				<div className="row h-100 justify-content-center align-items-center">
					<form onSubmit={submitHandler} className="col-12">
						<div className="mb-3 form-group">
							<label htmlFor="age" className="form-label">Age</label>
							<input ref={ageRef} defaultValue={profile ? profile.age : ""} type="number" className="form-control" id="age"></input>
						</div>
						<div className="mb-3 form-group">
							<label htmlFor="gender" className="form-label">Gender</label>
							<input ref={genderRef} defaultValue={profile ? profile.gender : ""} type="text" className="form-control" id="gender"></input>
						</div>
						<div className="mb-3 form-group">
							<label htmlFor="about" className="form-label">About</label>
							<input ref={aboutRef} defaultValue={profile ? profile.about : ""} type="text" className="form-control" id="about"></input>
						</div>
						<div className="mb-3 form-group">
							<label htmlFor="inspiration" className="form-label">Inspiration</label>
							<input ref={inspirationRef} defaultValue={profile ? profile.inspiration : ""} type="text" className="form-control" id="inspiration"></input>
						</div>
						<div className="mb-3 form-group">
							<label htmlFor="purpose" className="form-label">Purpose</label>
							<input ref={purposeRef} defaultValue={profile ? profile.purpose : ""} type="text" className="form-control" id="purpose"></input>
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary btn-block">Submit</button>
							<Link className="btn btn-info btn-block" to="/profile">Return to Profile</Link>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}



const mapStateToProps = state => ({
	profile: state.profileReducer.profile
})

CreateUpdateProfile.propTypes = {
	createAndUpdateProfile: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {createAndUpdateProfile})(CreateUpdateProfile)