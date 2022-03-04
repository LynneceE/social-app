const { Schema, model, Types } = require('mongoose');

// add reaction schema
const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
        default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)


const ThoughtSchema = new Schema ({
    
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    username: {
        type: String,
        required: true
    },




});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;