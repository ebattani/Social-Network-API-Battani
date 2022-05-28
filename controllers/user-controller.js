const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req, res) {

        User.find({})

            .then(dbUserData => res.json(dbUserData))
            
    },


    getUserById({ params }, res) {

        User.findOne({ _id: params.id })

            .populate('thoughts')

            .populate('friends')

            .select('-__v')

            .then(dbUserData => {

                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTAILS!' });

                    return;

                }

                res.json(dbUserData);
            })
        
    },


    createUser({ body }, res) {

        User.create(body)

            .then(dbUserData => res.json(dbUserData))

    },


    updateUser({ params, body }, res) {

        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })

            .then(dbUserData => {
                
                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTAILS!' });

                    return;

                }

                res.json(dbUserData);

            })

    },

    deleteUser({ params }, res) {

        User.findOneAndDelete({ _id: params.id })

            .then(dbUserData => {

                if (!dbUserData) {

                    return res.status(404).json({ message: 'INVALID CREDENTAILS!' });

                }


            })
            .then(() => {

                res.json({ message: 'DELETED USER' });

            })

    },


    addFriend({ params }, res) {

        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            
        .then(dbUserData => {

                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTAILS!' });

                    return;

                }

                res.json(dbUserData);

            })



    },


    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })

            .then(dbUserData => {

                if (!dbUserData) {

                    res.status(404).json({ message: 'INVALID CREDENTAILS!' });

                    return;
                    
                }

                res.json(dbUserData);
            })

    },

}

module.exports = userController;