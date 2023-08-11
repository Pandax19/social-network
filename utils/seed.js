const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUser } = require('./data');

console.time('seed');
connection.on('error', console.error);

// ... (other code)

connection.once('open', async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Collections dropped');

        const existingEmails = new Set();

        const userData = [];
        const thoughtData = [];

        for (let i = 0; i < 50; i++) {
            let username, email;

            do {
                username = getRandomUser();
                email = `${username}@school.com`;
            } while (existingEmails.has(email));

            existingEmails.add(email);

            const thoughts = []; // Change to an empty array
            const friends = [getRandomUser(), getRandomUser()];

            userData.push({ username, email, thoughts, friends });

            const thoughtName = `${username}'s thought`;
            const thoughtText = getRandomThought();
            const createdAt = new Date().toISOString();
            const users = [getRandomUser(), getRandomUser()];
            const reactions = [
                { reactionBody: `${getRandomUser()}'s thought is dumb`, username: getRandomUser() },
                { reactionBody: `${getRandomUser()}'s thought is interesting`, username: getRandomUser() }
            ];

            thoughtData.push({ thoughtName, thoughtText, createdAt, users, reactions });
        }

        const createdUsers = await User.insertMany(userData);
        console.log(`${createdUsers.length} users created`);

        const createdThoughts = await Thought.insertMany(thoughtData);
        console.log(`${createdThoughts.length} thoughts created`);

        console.log('Thoughts and users created');

        console.timeEnd('seed');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
