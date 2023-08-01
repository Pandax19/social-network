const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionName: {
            type: String,
            required: true,
        },
        reactionText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use moment to format date on get
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },

    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;

