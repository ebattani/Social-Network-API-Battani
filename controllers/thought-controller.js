const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // GET ALL
    getAllThoughts(req, res) {

        Thought.find({})

            .then(dbThoughtData => res.json(dbThoughtData))

    },

    // GET USER BY ID 
    getThoughtById({ params }, res) {

        Thought.findOne({ _id: params.thoughtId })

            .then(dbThoughtData => {

                if (!dbThoughtData) {

                    res.status(404).json({ message: 'INVALID CREDENTIALS' });

                    return;
                }

                res.json(dbThoughtData);
            })
    },

        // ADD REACTION
        addReaction({ params, body }, res) {

            Thought.findOneAndUpdate(

                { _id: params.thoughtId },

                { $addToSet: { reactions: body } },

                { new: true, runValidators: true }

            )
                .then(dbThoughtData => {

                    if (!dbThoughtData) {

                        return res.status(404).json({ message: 'INVALID CREDENTIALS' });

                    }

                    res.json(dbThoughtData);
                })
        },

    //ADD THOUGHTS
    addThought({ params, body }, res) {

        Thought.create(body)

            .then(({ _id }) => {

                return User.findOneAndUpdate(

                    { _id: params.userId },

                    { $push: { thoughts: _id } },

                    { new: true }

                );
            })
            .then(dbUserData => {

                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTIALS' });

                    return;

                }

                res.json(dbUserData);
            })
    },

    // UPDATE THOUGHTS
    updateThought({ params, body }, res) {

        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })

            .then(dbThoughtData => {

                if (!dbThoughtData) {

                    res.status(404).json({ message: 'INVALID CREDENTIALS' });

                    return;

                }

                res.json(dbThoughtData);

            })
    },

    // REMOVE THOUGHTS
    removeThought({ params }, res) {

        Thought.findOneAndDelete({ _id: params.thoughtId })

            .then(deletedThought => {

                if (!deletedThought) {

                    return res.status(404).json({ message: 'INVALID CREDENTIALS' });

                }
                return User.findOneAndUpdate(
                    
                    { _id: params.userId },

                    { $pull: { thoughts: params.thoughtId } },

                    { new: true }

                );
            })
            .then(dbUserData => {

                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTIALS' });

                    return;

                }

                res.json(dbUserData);
            })
    },

    // REMOVE REACTION
    removeReaction({ params }, res) {

        Thought.findOneAndUpdate(

            { _id: params.thoughtId },

            { $pull: { reactions: { reactionId: params.reactionId } } },

            { runValidators: true, new: true }
        )

            .then(dbUserData => res.json(dbUserData))

    }
};

module.exports = thoughtController;