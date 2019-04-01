import mongoose from 'mongoose'
const {Schema} = mongoose

const commentSchema = new Schema({
	id: {
		type: String,
		unique: true
	},
	authorId: {
		type: String,
	},
	articleId: {
		type: String
	},
	body: String,
	date: {
		type: Number,
		default: Date.now()
	},
})

const Comment = mongoose.model('comments',commentSchema)

export {Comment as default}