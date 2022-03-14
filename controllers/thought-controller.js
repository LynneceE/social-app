const { Thought, User } = require('../models');


const thoughtController = {
    // GET ALL THOUGHTS
    getAllThought(req,res) {
        Thought.find({})
        //populate reactions
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    // GET ONE THOUGHT BY ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
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
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // UPDATE A THOUGHT BY ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbThoughtData => {
            if (dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
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
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            } //delete thought from user
            return User.findOneAndUpdate(
                { _id: parmas.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
              )
            })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
              }
            res.json(dbThoughtData);
        })
        .catch(err => res.sendStatus(400).json(err));
    },

    // create and delete reactions
    addReaction({ params, body }, res) {
        console.log("BODY", body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$addToSet: { reactions: body } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbthoughtData) {
                res.status(404).json({ message: 'No thought foun with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((dbthoughtData) => res.json(dbthoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;