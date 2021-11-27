import {LOAD_USER, AUTH_ERROR} from "../actions/types"

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
			return {...state, isAuthenticated: true, loading: false, user: payload}
	}
}