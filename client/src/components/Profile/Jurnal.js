import {connect} from "react-redux"
import PropTypes from "prop-types"

const Jurnal = ({profileReducer: {profile, loading}}) => {
	

	return(
		<div>
			<h1>Jurnal page</h1>
			<h2>sd</h2>
			<p>about: {profile.about}</p>
		</div>
	)
}

const mapStateToProps = state => ({
	profileReducer: state.profileReducer
})

Jurnal.propTypes = {
	profileReducer: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(Jurnal);