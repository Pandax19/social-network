const { Schema, model } = require('mongoose');

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
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),            
        },
        users: [{
            type: Schema.Types.ObjectId,
            required: true
        }],
       
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
              },]

    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
    
    ); 
    const Thought = model('Thought', thoughtsSchema);

    module.exports =  Thought ;