const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');


router

    .route('/:id/friends/:friendId')

    .post(addFriend)

    .delete(removeFriend);

router

    .route('/')

    .get()

    .post();

router

    .route('/')

    .get(getAllUsers)

    .post(createUser);


router

    .route('/:id')

    .get(getUserById)

    .put(updateUser)

    .delete(deleteUser)

module.exports = router;