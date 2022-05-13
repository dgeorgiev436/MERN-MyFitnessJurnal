const express = require("express");
const router = express.Router();
const config = require("config")
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const mongoose = require('mongoose');

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route    POST api/profile/monthlyPerformance
// @desc     Add monthly performance where workouts through the month will be recorded
// @access   Private
router.post("/monthlyPerformance",
		check("splitName", "Training split name is required").notEmpty(),
		check("year", "Year is required").notEmpty(),
		check("month", "Month is required").notEmpty(),	   
	auth, async(req,res) => {
	
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		 return res.status(400).json({ errors: errors.array() });
	}
	
	const {splitName, year, month} = req.body;
	
	const input = {splitName, year, month}
	
	try{
		
		const profile = await Profile.findOne({user: req.user.id})
		
		profile.performanceTracker.unshift(input);
		
		await profile.save();
		
		res.json(profile);
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
	
})

// @route    POST api/profile/monthlyPerformance/:monthlyPerformanceId/workout
// @desc     Add Workout to a performance tracker
// @access   Private
router.post("/monthlyPerformance/:monthlyPerformanceId/workout",
	check("workoutName", "Workout name is required").notEmpty(),
	auth, async(req,res) => {
	
		const errors = validationResult(req);
	
		if(!errors.isEmpty()){
			 return res.status(400).json({ errors: errors.array() });
		}
	
		const {workoutName} = req.body
		const workout = {workoutName}
		try{
			const profile = await Profile.findOne({user: req.user.id})
			
			const jurnal = profile.performanceTracker.find(jurnal => jurnal._id.toString() === req.params.monthlyPerformanceId )
			
			jurnal.workouts.unshift(workout);
			
			await profile.save();
			
			res.json(profile);
			
		}catch(err){
			console.error(err.message);
			res.status(500).send("Server Error");
		}
});

// @route    PUT api/profile/monthlyPerformace/:monthlyPerformanceId
// @desc     Update workout jurnal by ID 
// @access   Private
router.put("/monthlyPerformace/:monthlyPerformanceId", auth,
	check("splitName", "Training split name is required").notEmpty(),
	check("year", "Year is required").notEmpty(),
	check("month", "Month is required").notEmpty(),	   
	async(req,res) => {
	
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		 return res.status(400).json({ errors: errors.array() });
	}
// 	Get user input
	const {splitName, year, month} = req.body;
// 	Turn the query string performanceId to ObjectId data type
	const objectId = mongoose.Types.ObjectId(req.params.monthlyPerformanceId)
	try{
// 		Find and update with mongoDb query
		const profile = await Profile.findOneAndUpdate(
			{
				user: req.user.id ,"performanceTracker._id" : objectId
			}, 
			{
				$set: {"performanceTracker.$.splitName": splitName, "performanceTracker.$.year": year, "performanceTracker.$.month": month}
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


// @route    GET api/profile/monthlyPerformace/all
// @desc     GET all monthly workout jurnals of this profile
// @access   Private
// router.get("/monthlyPerformace/all", auth, async(req,res) => {
// 	try{
		
// 		const profile = await Profile.findOne({user: req.user.id});
		
// 		if(!profile) {
// 			return res.status(400).json({msg: "There is no profile for this user"});
// 		}
		
// 		res.json(profile);
		
// 	}catch(err){
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

// @route    GET api/profile/monthlyPerformace/:monthlyPerformaceId/excersises
// @desc     Get all excersises data from specific jurnal
// @access   Private
// router.get("/monthlyPerformace/:monthlyPerformaceId/excersises", auth, async(req,res) => {
// 	try{
// 		const profile = await Profile.findOne({user: req.user.id});
		
// 		const jurnal = profile.performanceTracker.find(jurnal => jurnal._id.toString() === req.params.monthlyPerformaceId);
		
// 		if(!jurnal) {
// 			return res.status(400).json({msg: "No workout jurnal found"});
// 		}
		
// 		res.json(jurnal.excersises);
		
// 	}catch(err){
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// })

// @route    GET api/profile/monthlyPerformaceId/:monthlyPerformaceId
// @desc     GET monthly performance jurnal by ID
// @access   Private
router.get("/monthlyPerformace/:monthlyPerformaceId", auth, async(req,res) => {

	try{
		const profile = await Profile.findOne({user: req.user.id});
		const jurnal = profile.performanceTracker.find(tracker => tracker._id.equals(req.params.monthlyPerformaceId))
		
		if(!jurnal) {
			return res.status(400).json({msg: "No jurnal found"});
		}
		
		res.json(jurnal)
		
	}catch(err){
		console.error(err.message);
		res.status(500).send("Server Error");
	}
})

// @route    POST api/profile/monthlyPerformace/:monthlyPerformaceId/:workoutId/excersise
// @desc     Add excersise data to specific monthly excersise jurnal
// @access   Private
router.post("/monthlyPerformace/:monthlyPerformaceId/:workoutId/excersise", auth,
	check("excersiseName", "Excersise name is required").notEmpty(),
	check("sets", "Atleast 1 set is required").isLength({min: 1}),
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
		const excersiseJurnal = profile.performanceTracker.find(jurnal => jurnal._id.equals(req.params.monthlyPerformaceId));
		const workout = excersiseJurnal.workouts.find(workout => workout._id.equals(req.params.workoutId))
		workout.excersises.unshift(excersiseObject);	
		
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
// router.get("/jurnal/:jurnalId/:excersiseId", auth, async(req,res) => {
// 	try{
// 		const profile = await Profile.findOne({user: req.user.id});
		
// 		const performanceJurnal = profile.performanceTracker.find(jurnal => jurnal._id.equals(req.params.jurnalId));
		
// 		if(!performanceJurnal) {
// 			return res.status(400).json({msg: "No jurnal found"});
// 		}
		
// 		const excersise = performanceJurnal.excersises.find(excersise => excersise._id.equals(req.params.excersiseId));
		
// 		if(!excersise) {
// 			return res.status(400).json({msg: "No excersise found"});
// 		}
		
// 		res.json(excersise)
// 	}catch(err){
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });



// @route    DELETE api/profile/jurnal/:jurnalId
// @desc     Find a jurnal by ID and delete it
// @access   Private
router.delete("/monthlyPerformace/:monthlyPerformaceId", auth, async(req,res) => {
	
	try{
		const profile = await Profile.findOne({user: req.user.id});
		
		profile.performanceTracker = profile.performanceTracker.filter(jurnal => jurnal._id.toString() !== req.params.monthlyPerformaceId );
		
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