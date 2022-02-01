import React from "react"
import "./Notification.css"


const Notification = ({setShowOverlay, setConfirmDeletion}) => {
	
	const onConfirmHandler = () => {
		setConfirmDeletion(true);
		setShowOverlay(false)
	}
	
	
	return(
	
		  <div className="overlay">
			<div className="dialog">

			  <div className="dialog__content">
				<h2 className="dialog__title">Delete a task?</h2>
				<p className="dialog__description">Are you sure you want to delete this task?</p>
			  </div>

			  <hr />

			  <div className="dialog__footer">
				<button onClick={() => setShowOverlay(false)} className="dialog__cancel">Cancel</button>
				<button onClick={onConfirmHandler} className="dialog__confirm">Yes, delete it</button>
			  </div>

			  </div>
		  </div>
		
	)
}

export default Notification