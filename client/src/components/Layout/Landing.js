import classes from "./Landing.module.css"
import "bootstrap/dist/css/bootstrap.css"
import {Link} from "react-router-dom"

const Landing = () => {
	return(
		<section className={classes.landing}>
			<div className={classes.overlay}>
				<div className={classes.inner}>
					<h1 className={classes.xLarge}>MyFitnessJurnal</h1>
					<p className={classes.lead}>Create a profile, write down and track your fitness achievements</p>
					<div className={classes.buttons}>
						<Link to="/register" className="btn btn-outline-light">Sign Up</Link>
						<Link to="/login" className="btn btn-outline-light">Login</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Landing;