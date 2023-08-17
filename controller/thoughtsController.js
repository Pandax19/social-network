const { Thought, User } = require('../models');

// const ThoughtController = { } || require('../models');
    
module.exports = {
    // get all Thought
        async getAllThoughts(req, res) {
        try {
            const think = await Thought.find()
        res.json(think);
    } catch (err) {
        console.error(err);
        res.status(400);
    }
    },
    

    // get one thoughts by id
    async getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then(think => {

            if (!think) {
                res.status(404).json({ message: ' I have no thought! ' });
                return;
            }
            res.json(think);
        }
        )
        .catch(err => {
            console.error(err);
            res.sendStatus(400);
        }
        );
    },  
    // createThought
    async createThought(req, res) {
       
        Thought.create(req.body)
        .then(think => res.json(think))
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
          });
    },
        // update thought by id
      async updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id }, body, { new: true, runValidators: true })
            .then(think => {
                if (!think) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(think);
            })
            .catch(err => res.status(400).json(err));
        },


    // delete thought
    async deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id }, 
            { new: true }
            )
        
        .then(think => {

            if (!think) {
                res.status(404).json({ message: 'No thought found with this id!' 
            });
                return;
            }
            res.json(think);
        }
        )
        .catch(err => res.status(400).json(err));
    },
    

    // add reaction
    async addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
        .then(think => {
            if (!think) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(think);
        }
        )
        .catch(err => res.json(err));
    },
    // remove reaction
    async removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { replies: { replyId: req.params.replyId } } },
            { new: true }
        )
        .then(think => res.json(think))
        .catch(err => res.json(err));
    }
};


// module.exports = ThoughtController;
