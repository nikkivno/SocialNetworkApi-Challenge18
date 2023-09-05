// This is so it wont complain when running server
const router = require('express').Router();
const {
getUsers,
getSingleUser,
createUser,
deleteUser,
updateUser,
addThought,
removeThought
} = require ('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

//  api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;