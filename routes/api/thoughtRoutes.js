const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    addThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought)

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/thoughts/:userId/thoughts/:thoughtId
router.route('/:userId/thought/:thoughtId').delete(deleteThought);

module.exports = router;
