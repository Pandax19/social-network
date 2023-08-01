const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { db } = require('../models/user');
const {
    getRandomThought,
    getRandomUser
} = require('../utils/random');

console.time('seed');


connection.once('open', async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});
    console.log('Collections deleted');

    const userData = [];
    const thoughtData = [];

    for (let i = 0; i < 50; i++) {
        const user = getRandomUser();
        userData.push(user);
    }
    const createdUsers = await User.collection.insertMany(userData);
    console.log(`${createdUsers.result.n} users created`);

    for (let i = 0; i < 100; i++) {
        const thought = getRandomThought();
        thoughtData.push(thought);
    }
    const createdThoughts = await Thought.collection.insertMany(thoughtData);
    console.log(`${createdThoughts.result.n} thoughts created`);

    for (let i = 0; i < 100; i++) {
        const randomThought = await Thought.findOne().skip(Math.floor(Math.random() * 100));
        const randomUser = await User.findOne().skip(Math.floor(Math.random() * 50));

        randomUser.thoughts.push(randomThought);
        await randomUser.save();
    }

    console.log('Thoughts added to users');

    for (let i = 0; i < 100; i++) {
        const randomUser = await User.findOne().skip(Math.floor(Math.random() * 50));
        const randomThought = await Thought.findOne().skip(Math.floor(Math.random() * 100));

        randomThought.reactions.push({
            reactionBody: getRandomThought(),
            username: randomUser.username
        });

        await randomThought.save();
    }

    console.log('Reactions added to thoughts');

    console.timeEnd('seed');
    process.exit(0);
});

// module.exports = seed;
//  
//
//