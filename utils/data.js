  const users= [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
  ];
  

  const thoughts = [
  'Decision Trackers are awesome',
  'Find My Phone is a useful app',
  'Learn Piano is not very good for learning Piano',
  'Starbase Defender is a great game, I love it',
  'Tower Defense is okay',
  'Monopoly Money is better than real money IMO',
  'Movie trailers are just the best parts of a movie distilled into 90 seconds',
  'Hello world, this is a comment',
  'Social media is a big waste of time',
  'Notes is my most used app',
  'Messages is open on my computer 24/7',
  'Email is open on my computer',
  'Compass is never opened',
  'Firefox is great for privacy',
];


const getRandomThought = () => {
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
    return thought;
    }

const getRandomUser = () => {
    const user = users[Math.floor(Math.random() * users.length)];
    return user;
    }



module.exports = { getRandomThought, getRandomUser };

