const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtName: {
            type: String,
            required: true,
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        users: [
            {
                type: String,
                required: true
            }
        ],
        reactions: [
            {
                reactionBody: String,
                username: String
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;