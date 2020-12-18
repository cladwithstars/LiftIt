const mongoose = require('mongoose');

const LiftSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    }, 
    weight: {
        type: Number,
        required: true,
    }, 
    reps: {
        type: Number,
        required: true,
    }, 
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }, 
});

module.exports = mongoose.model('lift', LiftSchema);