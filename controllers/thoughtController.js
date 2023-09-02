const {ObjectId} = require('mongoose').Types;
const { User, Thought} = require ('../models');

const thoughtCount = async() => {
    const numberofThoughts = await Thought.aggregate();
    return numberofThoughts;
}

// execute aggregate

module.exports = {
    async getThoughts(req,res) {
        try {
            const throughts = await Thought.find();
            const thoughtobj = {
                thoughts, 
                numberofThoughts = await numberofThoughts(),
            };
            return res.json(thoughtobj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({_id: req.params.userId})
            .select('-__v')
            .lean();

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json({
                thought,
                user: await user(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        }catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID'})
            }
        }
    },

    
}