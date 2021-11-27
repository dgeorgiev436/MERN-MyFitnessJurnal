import axios from "axios"
import {LOAD_USER, AUTH_ERROR} from "./types"
import { setAlert } from "./alertActions"
import { setAuthToken } from "../utils/setAuthToken"


// LOAD USER
export const loadUser = () => async dispatch => {
	
	if(localStorage.token){
		setAuthToken(localStorage.token)
	}
	
	try{
		const res = await axios.get("/api/auth");
		
		dispatch({
			type: LOAD_USER,
			payload: res.data
		})
	}catch(err){
		
		dispatch({
			type: AUTH_ERROR
		})
	}
}

export const register = (name, email, password) => async dispatch => {
	
}