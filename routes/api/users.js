const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const User = require("../../models/User")

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/",
// 		Validation checks with express-validator
	check("name", "Name is required").notEmpty(),
	check("email", "Please include a valid email").isEmail(),
	check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
	async(req,res) => {
// 		Gets all errors failed to pass the check
		const errors = validationResult(req);
	
		if(!errors.isEmpty()){
// 		Send status code 400 and an array of the errors
			return res.status(400).json({errors: errors.array() });
		}
	
		const {name, email, password} = req.body;
	
		try{
// 		Check if user exists
		let user = await User.findOne({email})
		
		if(user){
			return res.status(400).json({errors: [{msg: "User already exists"}] })
		}
	
		user = await new User({name, email, password})
	
// 		Hashing the password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt)
	
		await user.save();
	
// 		Creating payload object and return the token
		const payload = {
			user: {
				id: user.id
			}
		};
	
		jwt.sign(
			payload,
			config.get("jwtSecret"),
			{expiresIn: "5 days"},
			(err, token) => {
				if(err) throw err;
				res.json({token})
			}
		)
			
		}catch(err){
			console.error(err.message);
			res.status(500).send("Server error")
		}
	
})



module.exports = router;