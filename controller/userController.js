const  { User }  = require('../models');
 

const headCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }
  

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
      
            const userObj = {
              users, 
              headCount: await headCount(),
            };
      
            res.json(userObj);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
    // get one user by id
   // get one user by id
async getUserById(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
},
    // createUser
    async createUser({ body }, res) {
        try {
            const newUser = await User.create(body);
            res.json(newUser);
        } catch (err) {
            res.json(err);
        }
    },
    // update user by id
    async updateUser({ params, body }, res) {
        const updatedUser = await user.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
        .then(updatedUser => {
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(updatedUser);
        }
        )
        .catch(err => res.json(err));
    },
    // delete user
    async deleteUser({ params }, res) {
        const user = await user.findOneAndDelete({ _id: params.id })
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbuserData);
        }
        )
        .catch(err => res.status(400).json(err));
    },
    // add friend
    async addFriend({ params }, res) {
        const user= await user.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbuserData);
        }
        )
        .catch(err => res.json(err));
    },
    // remove friend
    async removeFriend({ params }, res) {
        const user = await user.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbuserData);
        }
        )
        .catch(err => res.json(err));
    }
};


