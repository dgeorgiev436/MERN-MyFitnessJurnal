import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Navigate} from "react-router-dom"

// https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

// Private route
const PrivateRoute = ({auth: {isAuthenticated, loading}, component: Component, children, ...rest }) => {
	
// 	If user is authenticated render props.children else navigate to login page
	return isAuthenticated ? children : <Navigate to="/login" />
}


const mapStateToProps = state => ({
	auth: state.authReducer
})

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PrivateRoute)