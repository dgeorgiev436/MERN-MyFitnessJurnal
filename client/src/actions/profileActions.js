import axios from "axios"
import {GET_PROFILE, PROFILE_ERROR, DELETE_PROFILE, GET_JURNALS, JURNALS_ERROR} from "./types"
import {setAlert} from "./alertActions"


// GET CURRENT USER PROFILE
export const getCurrentProfile = () => async dispatch => {
	
	try{
		
		const res = await axios.get("/api/profile/me");
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		
		
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}


// Create/Update Profile 

export const createAndUpdateProfile = (age, gender, about, purpose, inspiration) => async dispatch => {
	
	
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	
	const body = JSON.stringify({age, gender, about, purpose, inspiration})
	
	try{
		
		const res = await axios.post("/api/profile", body, config)
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		
		dispatch(setAlert('Profile Updated', 'success'));
		
	}catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
		
		dispatch(setAlert('Failed to Update Profile', 'danger'));
	}
}

// Delete User & Profile 

export const deleteProfileAndUser = () => async dispatch => {
	
	try{
		
		const res = axios.delete("api/profile");
		
		dispatch({
			type: DELETE_PROFILE,
			payload: res.data
		})
		
		dispatch(setAlert('Profile Deleted', 'success'));
		
	}catch(err){
		
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
		
		dispatch(setAlert('Failed to Update Profile', 'danger'));
	}
}

// GET ALL MONTHLY WORKOUT JURNALS FOR THE PROFILE
export const getAllWorkoutJurnals = () => async dispatch => {
	
	try{
		
		const res = await axios.get("/api/profile/monthlyPerformace/all");
		
		dispatch({
			type: GET_JURNALS,
			payload: res.data
		})
		
	}catch(err){
		
		dispatch({
			type: JURNALS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
		
		dispatch(setAlert('Failed to Update Profile', 'danger'));
		
	}
	
}