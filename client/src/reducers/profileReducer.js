import {GET_PROFILE, PROFILE_ERROR,DELETE_PROFILE, GET_JURNALS} from "../actions/types"


const initialState = {
	profile: null,
	loading: true,
	error: {}
}

const profileReducer = (state = initialState, action) => {
	const {payload, type} = action;
	
	switch(type){
		case GET_PROFILE:
			return {...state, profile: payload, loading: false}
		case PROFILE_ERROR: 
			return {...state, profile: null, loading: true, error: payload}
		case DELETE_PROFILE:
			return {...state, profile: null, loading: true}
		case GET_JURNALS:
			return {...state, profile: payload, loading: false}
		default:
			return state;
	}
} 


export default profileReducer;