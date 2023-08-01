const { thoughts, users } = require('../models');

 const thoughtsController = { } || require('../models');
    
module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            thoughts.find({})
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        },
        )
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
    },


    // get one thought by id
    getThoughtById({ params }, res) {
        thoughts.findOne({ _id: params.id })
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {

            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        }
        )
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }
        );
    },  
    // createThought
    createThought({ body }, res) {
       
        thoughts.create(body)
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));

    },
        // update thought by id
        updateThought({ params, body }, res) {
            thoughts.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
        },


    // delete thought
    deleteThought({ params }, res) {
        thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {

            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        }
        )
        .catch(err => res.status(400).json(err));
    },
    

    // add reaction
    addReaction({ params, body }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        }
        )
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    }
};


module.exports = thoughtsController;

// Path: routes\api\thoughts-routes.js
// const router = require('express').Router();
// const {
//     getAllThoughts,
//     getThoughtById,
//     createThought,
//     updateThought,
//     deleteThought,
//     addReaction,
//     removeReaction
// } = require('../../controllers/thoughts-controller');
//
// // /api/thoughts
// router
//     .route('/')
//     .get(getAllThoughts)
//     .post(createThought);
//
// // /api/thoughts/:id
// router
//     .route('/:id')
//     .get(getThoughtById)
//     .put(updateThought)
//     .delete(deleteThought);
//

