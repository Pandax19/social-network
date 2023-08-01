const { Schema, model } = require('mongoose');
const moment = require('moment');
const Reaction = require('./reaction');

const thoughtsSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
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
            default: Date.now,
            // use moment to format date on get
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
       
        reactions: [Reaction.schema]

    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
    
    ); 
    const Thought = model('Thought', thoughtsSchema);

    module.exports = Thought;