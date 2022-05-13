import {connect} from "react-redux"
import PropTypes from "prop-types"
import JurnalItem from "./JurnalItem"

const Jurnals = ({profileReducer: {profile, loading}}) => {
	

	return(
		<div>
			<h1>All workout jurnals</h1>
			<p>Create a workout jurnal and write down all your gym accomplishments</p>
			<div>
		{/* Check if any workout jurnal exist for this profile. If jurnals exist render the jurnalItem compoennt and pass the jurnal data via props */}
				{profile.performanceTracker.length > 0 ? (
					profile.performanceTracker.map((jurnal) => (
						<JurnalItem key={jurnal._id} jurnal={jurnal} />
					))
				) : (
// 		If no jurnals are found
					<h4>No jurnals found...</h4>
				)}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	profileReducer: state.profileReducer
})

Jurnals.propTypes = {
	profileReducer: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(Jurnals);