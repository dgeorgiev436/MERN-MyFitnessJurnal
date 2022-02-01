import axios from "axios"
import {LOAD_USER, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER} from "./types"
import { setAlert } from "./alertActions"
import  setAuthToken  from "../utils/setAuthToken"


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

// Register user action
export const registerUser = (name, email, password) => async dispatch => {
// 	Build config object and set headers
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	
	const body = JSON.stringify({name,email,password})
	
	try{
		const res = await axios.post("api/users", body, config)
		
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		})
		
		dispatch(loadUser());
		
	}catch(err){
		
		const errors = err.response.data.errors;
// 		Display erros
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
		}
		
		dispatch({
			type: REGISTER_FAIL
		})
	}
}

// Login user action
export const loginUser = (email, password) => async dispatch => {
	
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}
	
	const body = JSON.stringify({email, password})
	
	try{
		
		const res = await axios.post("/api/auth", body, config);
		
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		})
		
		dispatch(loadUser())
		
	}catch(err){
		const errors = err.response.data.errors;
		
		if(errors){
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
		}
		
		dispatch({
			type: LOGIN_FAIL
		})
	}
}

// Logout user action
export const logoutUser = () => dispatch => {
	
	dispatch({
		type: LOGOUT_USER
	})
}