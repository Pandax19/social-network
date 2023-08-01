const { user } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        const user = await user.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbuserData => res.json(dbuserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }
        );
    },
    // get one user by id
    async getUserById({ params }, res) {
        const user = await user.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbuserData => {
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbuserData);
        }
        )
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }
        );
    },
    // createUser
    async createUser({ body }, res) {
        const user = await user.create(body)
        .then(dbuserData => res.json(dbuserData))
        .catch(err => res.json(err));
    },
    // update user by id
    async updateUser({ params, body }, res) {
        const user = await user.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
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



