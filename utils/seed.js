const connection = require('../config/connection');
const { user, Thought } = require('../models');
const { getRandomThought, getRandomUser } = require('./data');

console.time('seed');
connection.on('error', (err) => err);

connection.once('open', async () => {
    let userCount = await connection.db.listCollections({name: 'users'}).toArray();
    let thoughtCount = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (userCount > 0 ) {   
        await user.deleteMany({});
    }
    if (thoughtCount > 0 ) {   
        await Thought.deleteMany({});
    }
    console.log('Collections dropped');


    const userData = [];
    const thoughtData = [];

    for (let i = 0; i < 50; i++) {
        const user = getRandomUser();
        userData.push(user);
    }
    const createdUsers = await user.insertMany(userData);
    console.log(`${createdUsers.result.n} users created`);

    user.push({
        username: 'testUser',
        email: ''
    });

    Thought.push({
        thoughtText: 'test thought',
        username: 'testUser'
    });

    for (let i = 0; i < 100; i++) {
        const thought = getRandomThought();
        thoughtData.push(thought);
    }
    const createdThoughts = await Thought.collection.insertMany(thoughtData);
    console.log(`${createdThoughts.result.n} thoughts created`);

    for (let i = 0; i < 100; i++) {
        const randomThought = await Thought.findOne().skip(Math.floor(Math.random() * 100));
        const randomUser = await user.findOne().skip(Math.floor(Math.random() * 50));

        randomUser.thoughts.push(randomThought);
        await randomUser.save();
    }

    console.log('Thoughts added to users');

    for (let i = 0; i < 100; i++) {
        const randomUser = await user.findOne().skip(Math.floor(Math.random() * 50));
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