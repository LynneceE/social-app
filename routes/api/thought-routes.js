const router = require('express').Router();

const {
    getAllThought,
    getThoughtById, //by id
    createThought,
    updateThought, //by id
    deleteThought //by id
} = require('../../controllers/thought-controller');

// get specific routes


// /api/thoughts
router
.route('/')
.get(getAllThought)
.post(createThought);



// /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


module.exports = router;