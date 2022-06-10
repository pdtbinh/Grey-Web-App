const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    // likeID: is automatically added
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: String,
        required: true,
        enum: ['Comment', 'Project', 'Post', 'Survey'],
    },
    placeID: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'place',
    },
})

module.exports = mongoose.model('Like', likeSchema);