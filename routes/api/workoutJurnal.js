const express = require("express");
const router = express.Router();
const config = require("config")
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const mongoose = require('mongoose');

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    POST api/profile/jurnal
// @desc     Add Workout jurnal
// @access   Private
router.post("/jurnal",
	check("workoutName", "Workout name is required").notEmpty(),
	check("year", "Year is required").notEmpty(),
	check("month", "Month is required").notEmpty(),
	auth, async(req,res) => {
	
		const errors = validationResult(req);
	
		if(!errors.isEmpty()){
			 return res.status(400).json({ errors: errors.array() });
		}
	
		const {workoutName, year, month} = req.body
		const performanceTracker = {workoutName, year, month}
		try{
			const profile = await Profile.findOne({user: req.user.id})
			profile.performanceTracker.unshift(performanceTracker);
			
			await profile.save();
			
			res.json(profile);
			
		}catch(err){
			console.error(err.message);
			res.status(500).send("Server Error");
		}
});

// @route    PUT api/profile/jurnal/:jurnalId
// @desc     Update workout jurnal by ID 
// @access   Private
router.put("/jurnal/:jurnalId", auth,
	check("workoutName", "Workout name is required").notEmpty(),
	check("year", "Year is required").notEmpty(),
	check("month", "Month is required").notEmpty(),
	async(req,res) => {
	
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		 return res.status(400).json({ errors: errors.array() });
	}
// 	Get user input
	const {workoutName, year, month} = req.body;
// 	Turn the query string performanceId to ObjectId data type
	const objectId = mongoose.Types.ObjectId(req.params.jurnalId)
	try{
// 		Find and update with mongoDb query
		const profile = await Profile.findOneAndUpdate(
			{
				user: req.user.id ,"performanceTracker._id" : objectId
			}, 
			{
				$set: {"performanceTracker.$.workoutName": workoutName, "performanceTracker.$.year": year, "performanceTracker.$.month": month}
			},
			{
				new: true
			}
		)
		
	
		
		res.json(profile);
		
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})


// @route    GET api/profile/jurnal
// @desc     GET all workout jurnals of this profile
// @access   Private
router.get("/jurnal", auth, async(req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id});
		
		if(!profile) {
			return res.status(400).json({msg: "There is no profile for this user"});
		}
		
		res.json(profile.performanceTracker);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/jurnal/:jurnalId
// @desc     Get all excersises data from specific jurnal
// @access   Private
router.get("/jurnal/:jurnalId/excersises", auth, async(req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id});
		
		const jurnal = profile.performanceTracker.find(jurnal => jurnal._id.toString() === req.params.jurnalId);
		
		if(!jurnal) {
			return res.status(400).json({msg: "No workout jurnal found"});
		}
		
		console.log("done")
		res.json(jurnal.excersises);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route    GET api/profile/jurnal/:jurnalId
// @desc     GET jurnal by ID
// @access   Private
router.get("/jurnal/:jurnalId", auth, async(req,res) => {

	try{
		const profile = await Profile.findOne({user: req.user.id});
		const jurnal = profile.performanceTracker.find(tracker => tracker._id.equals(req.params.jurnalId))
		
		if(!jurnal) {
			return res.status(400).json({msg: "No jurnal found"});
		}
		
		res.json(jurnal)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route    POST api/profile/jurnal/:jurnalId
// @desc     Add excersise data to specific jurnal
// @access   Private
router.post("/jurnal/:jurnalId", auth,
	check("excersiseName", "Excersise name is required").notEmpty(),
	check("sets", "Atleast 1 set is required").isLength({min: 1}),
	// check("weight", "Please enter weight used").notEmpty(),
	// check("reps", "Please enter a number of reps").notEmpty(),
	async(req,res) => {
	
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
			 return res.status(400).json({ errors: errors.array() });
	}
	
// 	Map through the sets object and create an array of total weight lifted for each set by multiplying the number of reps by the amount of weight lifted
	const volume = req.body.sets.map(set => set.weight * set.reps)
	let totalVolume = 0;
// 	Loop through the array and add everything together. This gives us the total weight lifted for each excersise.
	volume.forEach((set) => {
		totalVolume += set
	})
	const {excersiseName, sets} = req.body;
// 	Create the excersise object
	const excersiseObject = {excersiseName, sets, volume: totalVolume};
	
	try{
		const profile = await Profile.findOne({user: req.user.id});
		const excersiseJurnal = profile.performanceTracker.find(jurnal => jurnal._id.equals(req.params.jurnalId));
		excersiseJurnal.excersises.unshift(excersiseObject);	
		
		await profile.save();
		
		res.json(profile)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/jurnal/:jurnalId/:excersiseId
// @desc     Find an excersise by ID from specific workout jurnal
// @access   Private
router.get("/jurnal/:jurnalId/:excersiseId", auth, async(req,res) => {
	try{
		const profile = await Profile.findOne({user: req.user.id});
		
		const performanceJurnal = profile.performanceTracker.find(jurnal => jurnal._id.equals(req.params.jurnalId));
		
		if(!performanceJurnal) {
			return res.status(400).json({msg: "No jurnal found"});
		}
		
		const excersise = performanceJurnal.excersises.find(excersise => excersise._id.equals(req.params.excersiseId));
		
		if(!excersise) {
			return res.status(400).json({msg: "No excersise found"});
		}
		
		res.json(excersise)
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});



// @route    DELETE api/profile/jurnal/:jurnalId
// @desc     Find a jurnal by ID and delete it
// @access   Private
router.delete("/jurnal/:jurnalId", auth, async(req,res) => {
	
	try{
		const profile = await Profile.findOne({user: req.user.id});
		
		profile.performanceTracker = profile.performanceTracker.filter(jurnal => jurnal._id.toString() !== req.params.jurnalId );
		
		await profile.save();
		
		
		res.json(profile);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    Delete api/profile/jurnal/:jurnalId/:excersiseId
// @desc     Find an excersise data by ID and delete it
// @access   Private
router.delete("/jurnal/:jurnalId/:excersiseId", auth, async(req,res) => {
	try{
		
		const profile = await Profile.findOne({user: req.user.id});
// 		Find jurnal index
		const jurnalIndex = profile.performanceTracker.findIndex(jurnal => jurnal._id.toString() === req.params.jurnalId);
// 		use the jurnal index to find the right excersises array
		profile.performanceTracker[jurnalIndex].excersises = profile.performanceTracker[jurnalIndex].excersises.filter(excersise => excersise._id.toString() !== req.params.excersiseId);

		await profile.save();
		
		res.json(profile)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

module.exports = router;