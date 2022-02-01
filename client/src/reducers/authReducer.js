import {LOAD_USER, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER} from "../actions/types"

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null
};

const authReducer = (state = initialState, action) => {
	const {payload, type} = action
	
	switch(type){
		case LOAD_USER:
			return {...state, isAuthenticated: true, loading: false, user: payload};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {...state, token: null, isAuthenticated: false, loading: false};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token)
			return {...state, ...payload, isAuthenticated: true, loading: false}
		case LOGOUT_USER:
			localStorage.removeItem("token");
			return {...state,user: null, token: null, isAuthenticated: false, loading: false};
		default:
			return state;
	}
}


export default authReducer;