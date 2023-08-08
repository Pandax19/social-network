const { Thoughts, User } = require('../models');

// const thoughtsController = { } || require('../models');
    
module.exports = {
    // get all thoughts
        async getAllThoughts(req, res) {
        try {
            const dbThoughtsData = await Thoughts.find({})
        res.json(dbThoughtsData);
    } catch (err) {
        console.error(err);
        res.status(400);
    }
    },
    

    // get one thought by id
    async getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => {

            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        }
        )
        .catch(err => {
            console.error(err);
            res.sendStatus(400);
        }
        );
    },  
    // createThought
    async createThought({ body }, res) {
       
        Thoughts.create(body)
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
          });
    },
        // update thought by id
      async updateThought({ params, body }, res) {
            Thoughts.findOneAndUpdate({_id: req.params.id }, body, { new: true, runValidators: true })
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
    async deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtsData => {

            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' 
            });
                return;
            }
            res.json(dbThoughtsData);
        }
        )
        .catch(err => res.status(400).json(err));
    },
    

    // add reaction
    async addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
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
    async removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    }
};


// module.exports = thoughtsController;
