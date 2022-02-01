import {getCurrentProfile, deleteProfileAndUser} from "../../actions/profileActions"
import { logoutUser } from "../../actions/authActions"
import "bootstrap/dist/css/bootstrap.css"
import {useEffect} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Notification from "../UI/Notification"
import {useState} from "react"

const Profile = ({getCurrentProfile, logoutUser, deleteProfileAndUser, authReducer: { userLoading, user }, profileReducer: {profile, loading}}) => {
	
	const [showOverlay, setShowOverlay] = useState(false)
	const [confirmDeletion, setConfirmDeletion] = useState(false);

	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])
	
	useEffect(() => {
	
		if(confirmDeletion){
			deleteProfileAndUser();	
			logoutUser();
		}
		
	}, [confirmDeletion, deleteProfileAndUser, logoutUser])
	
	const onDeleteHandler = () => {
		
		setShowOverlay(true);
	
	}
	
	return(
		<div className="container text-center">
			<h1>{!userLoading ? `${user.name}'s profile page` : "not specified"}</h1>
			<p>Name: {!userLoading ? user.name : "Not specified"}</p>
			<p>Age: {!loading ? profile.age : "Not specified"}</p>
			<p>Gender: {!loading ? profile.gender : "Not specified"}</p>
			<p>About: {!loading ? profile.about : "Not specified"}</p>
			<p>Inspiration: {!loading ? profile.inspiration : "Not specified"}</p>
			<p>Purpose: {!loading ? profile.purpose : "Not specified"}</p>
			<div className="d-grid gap-2">
				<Link className="btn btn-primary" to="/update-profile">Create/Update Profile</Link>
				<Link className="btn btn-warning" to="/jurnal">Workout Jurnal</Link>
				<button className="btn btn-danger" onClick={onDeleteHandler}>Delete Profile</button>
			</div>
			{showOverlay && <Notification setShowOverlay={setShowOverlay} setConfirmDeletion={setConfirmDeletion} />}
		</div>
	)
}

const mapStateToProps = state => ({
	profileReducer: state.profileReducer,
	authReducer: state.authReducer
})

Profile.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profileReducer: PropTypes.object.isRequired,
	deleteProfileAndUser: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	authReducer: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getCurrentProfile, deleteProfileAndUser, logoutUser})(Profile);