const express = require("express");
const router = express.Router();
const config = require("config")
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const mongoose = require('mongoose');

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private
router.get("/me", auth, async(req,res) => {
	
	try{
// 		Find user
		const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name"]);
// 		Check if user exists
		if(!profile) {
			return res.status(400).json({msg: "There is no profile for this user"});
		}
// 		return user
		res.json(profile);
		
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route    POST api/profile
// @desc     Create or update profile
// @access   Private
router.post("/", auth, async(req,res) => {
	const {age, gender, about, purpose, inspiration} = req.body
		const profile = {
			user: req.user.id,
			age,
			gender,
			about,
			purpose,
			inspiration
		}
		
	try{
		const newProfile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profile}, {new: true, upsert: true});
		
		res.json(newProfile)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/:userId
// @desc     Get profile by user ID
// @access   Public
router.get("/:userId", async(req,res) => {
	try{
		const profile = await Profile.findOne({user: req.params.userId}).populate("user", ["name", "email"]);
		
		if(!profile){
			return res.status(400).json({msg: "Profile not found"})
		}
		
		return res.json(profile)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/profile
// @desc     Delete User And Profile
// @access   Private
router.delete("/", auth, async(req,res) => {
	try{
// 		Remove User and his Profile
		
		await Promise.all([
			Profile.findOneAndDelete({user: req.user.id}),
			User.findOneAndDelete({_id: req.user.id})
		])
		
		res.json({msg: "User Deleted"})
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});



module.exports = router;