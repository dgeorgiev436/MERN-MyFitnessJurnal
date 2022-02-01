import {GET_PROFILE, PROFILE_ERROR,DELETE_PROFILE} from "../actions/types"


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
		default:
			return state;
	}
} 


export default profileReducer;