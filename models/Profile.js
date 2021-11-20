const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	age: {
		type: Number
	},
	gender: {
		type: String,
	},
	about: {
		type: String,
	},
	purpose: {
		type: String
	},
	inspiration: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	performanceTracker: [
		{
			workoutName: {
				type: String,
				required: true
			},
			year: {
				type: String,
				required: true
			},
			month: {
				type: String,
				required: true
			},
			excersises: [
				{
					excersiseName: {
						type: String,
						required: true
					},
					sets: [
						{
							weight: {
								type: Number,
								required: true
							},
							reps: {
								type: Number,
								required: true
							}
						}
					],
					volume: {
						type: Number
					}
				}
			]
		}
	]
})

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;