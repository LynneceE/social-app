const { Thought } = require('../models');


const thoughtController = {
    // GET ALL THOUGHTS
    getAllThought(req,res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    // GET ONE THOUGHT BY ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    // CREATE A THOUGHT
    createThought({ body }, res) {
        console.log("BODY", body);
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },


    // UPDATE A THOUGHT BY ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true })
        .then(dbThoughtData => {
            if (dbThoughtData) {
                res.status(404).json({ message: "No thought foud with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


    // DELETE A THOUGHT BY ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.sendStatus(400).json(err));
    }
};

module.exports = thoughtController;