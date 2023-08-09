const { Schema, model } = require('mongoose');
// create the User model using the UserSchema
const userSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [
          {
            type: String,
            ref: 'Thought'
          }
        ],
        friends: [
          {
             type: String,
            ref: 'User'
          }   
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        
    }   
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}
);

const User = model('User', userSchema);

// export the User model
module.exports = User;

