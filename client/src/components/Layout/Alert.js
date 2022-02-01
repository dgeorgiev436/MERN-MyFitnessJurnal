import { connect } from "react-redux"
import "bootstrap/dist/css/bootstrap.css"
import {Alert} from "react-bootstrap";
import classes from "./Alert.module.css"

const AlertComp = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
	<Alert key={alert.id} variant={alert.alertType} className={`mt-5 ${classes.alert}`}>
		{alert.msg}
	</Alert>
))




const mapStateToProps = state => ({
	alerts: state.alertReducer
})

export default connect(mapStateToProps)(AlertComp);