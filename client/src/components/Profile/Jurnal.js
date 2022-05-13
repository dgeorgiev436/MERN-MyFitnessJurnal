import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getAllWorkoutJurnals} from "../../actions/profileActions"
import {useEffect} from "react"

const Jurnal = ({getAllWorkoutJurnals}) => {
	
	useEffect(() => {
		getAllWorkoutJurnals()
	}, [ getAllWorkoutJurnals ] )
	
	return(
		<div>
			<h1>Jurnal page</h1>
			<h2>sd</h2>
		</div>
	)
}

const mapStateToProps = state => ({
	
})

Jurnal.propTypes = {
	getAllWorkoutJurnals: PropTypes.func.isRequired
}


export default connect(mapStateToProps, {getAllWorkoutJurnals})(Jurnal);