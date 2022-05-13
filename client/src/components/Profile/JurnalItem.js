import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"


const JurnalItem = ({jurnal}) => {
	
	
	return(
		
		<div>
			<h1>{jurnal.month} - {jurnal.year}</h1>
			<Link to={`/jurnal/${jurnal._id}`}> View Jurnal</Link>
		</div>
		
	)
}

export default connect()(JurnalItem)