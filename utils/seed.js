// const connection = require('../config/connection');
// const { User, Thought } = require('../models');
// const { getRandomThought, getRandomUser } = require('./data');

// console.time('seed');
// connection.on('error', (err) => err);
// // let contact = new ContactData({name, number});

// connection.once('open', async () => {
//     let userCount = await connection.db.listCollections({name: 'users'}).toArray();
//     let thoughtCount = await connection.db.listCollections({name: 'thoughts'}).toArray();
//     if (userCount.length ) {   
//         await User.deleteMany({});
//     }
//     if (thoughtCount.length ) {   
//         await Thought.deleteMany({});
//     }
//     console.log('Collections dropped');


//     const userData = [];
//     const thoughtData = [];

//     for (let i = 0; i < 50; i++) {
//         const username = getRandomUser();
//         // userData.push(user);
    
//         const createdUsers = await User.insertMany(userData);
//         console.log(`${createdUsers.result} users created`);

//         const email = `${username}@school.com `;
//         const thoughts = getRandomThought();
//         const friends = getRandomUser();

//         const thoughtName = `${getRandomUser()}'s thought`;
//         const thoughtText = getRandomThought();
//         const createdAt = "12:07am";
//         const users = getRandomUser();
//         const reactions = `${getRandomUser()}'s thought is dumb`;

//         userData.push({
//             username,
//             email,
//             thoughts,
//             friends
//         });

//         thoughtData.push({
//             thoughtName,
//             thoughtText,
//             createdAt,
//             users,
//             reactions
//     });
//     }

//     // for (let i = 0; i < 100; i++) {
//     //     const thought = getRandomThought();
//     //     thoughtData.push(thought);
//     // }
//     await User.collection.insertMany(users);
//     await Thought.collection.insertMany(thoughtData);
//     console.log(`${createdThoughts.result} thoughts created`);

//     // for (let i = 0; i < 100; i++) {
//     //     const randomThought = await Thought.findOne().skip(Math.floor(Math.random() * 100));
//     //     const randomUser = await User.findOne().skip(Math.floor(Math.random() * 50));

//     //     randomUser.thoughts.push(randomThought);
//     //     await randomUser.save();
//     // }

//     console.log('Thoughts added to users');

//     // for (let i = 0; i < 100; i++) {
//     //     const randomUser = await User.findOne().skip(Math.floor(Math.random() * 50));
//     //     const randomThought = await Thought.findOne().skip(Math.floor(Math.random() * 100));

//     //     randomThought.reactions.push({
//     //         reactionBody: getRandomThought(),
//     //         username: randomUser.username
//     //     });

//     //     await randomThought.save();



//     // }
//     console.log('Reactions added to thoughts');

//     console.timeEnd('seed');
//     process.exit(0);
// });

// // module.exports = seed;
// //  
// //
// //


const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUser } = require('./data');

console.time('seed');
connection.on('error', console.error);

connection.once('open', async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Collections dropped');

        const userData = [];
        const thoughtData = [];

        for (let i = 0; i < 50; i++) {
            const username = getRandomUser();
            const email = `${username}@school.com`;
            const thoughts = getRandomThought();
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
