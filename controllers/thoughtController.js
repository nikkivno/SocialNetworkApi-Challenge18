const {ObjectId} = require('mongoose').Types;
const { User, Thought} = require ('../models');

const thoughtCount = async() => {
    const numberofThoughts = await Thought.aggregate();
    return numberofThoughts;
}


module.exports = {
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            .sort({createdAt: -1});
            
            return res.json(thoughts);
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
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        try {
            const user = await User.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({message: 'No user with this ID'})
            }
            res.json({message: 'Thought successfully deleted'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addThought(req,res) {
        try {
            console.log('You are adding a Thought');
            console.log(req.body);
            const thought = await Thought.create(req.body);
            console.log(thought);

            // TODO: Update the user's thoughts by adding the thought ID to it
            // The user whose id (findOneAndUpdate for the id that matches req.body.userId)
        } catch (err) {
            res.status(500).json(err);
        }
        try {

        } catch (err) {

        }
    },

    
}