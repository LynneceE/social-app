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
            minLength:1,
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

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

  // include reactions
  reactions: [ReactionSchema],
},

{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
    
);

// add virtual to count reactions
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;