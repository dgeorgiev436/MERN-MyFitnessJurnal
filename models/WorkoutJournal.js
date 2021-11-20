// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


// const WorkoutJournalSchema = new Schema({
// 	user: {
// 		type: Schema.Types.ObjectId,
// 		ref: "user"
// 	},
// 	strengthRecording: [
// 		{
// 			workoutName: {
// 				type: String,
// 				required: true
// 			},
// 			year: {
// 				type: String,
// 				required: true
// 			},
// 			month: {
// 				type: String,
// 				required: true
// 			},
// 			excersises: [
// 				{
// 					name: {
// 						type: String,
// 						required: true
// 					},
// 					sets: [
// 						{
// 							weight: Number,
// 							reps: Number,
// 						}
// 					],
// 					volume: {
// 						type: Number,
// 						required: true
// 					}
// 				}
// 			]
// 		}
// 	],
// 	date: {
// 		type: Date,
// 		default: Date.now
// 	}
// })


// const WorkoutJournal = mongoose.model("workoutJournal", WorkoutJournalSchema);

// module.exports = WorkoutJournal