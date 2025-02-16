import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
