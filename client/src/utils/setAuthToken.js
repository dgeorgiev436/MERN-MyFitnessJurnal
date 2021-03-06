import axios from "axios"

// If the token exists we set it in global header
const setAuthToken = (token) => {
	if(token){
		axios.defaults.headers.common["x-auth-token"] = token;
	}else{
		delete axios.defaults.headers.common["x-auth-token"];
	}
}

export default setAuthToken;