const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ createdBy: req.user._id });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    try {
        const userExists = await User.findOne({ email: email, createdBy: req.user._id });
        if (userExists) {
            return res.status(400).json({ message: 'You have already added a user with this email.' });
        }
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            createdBy: req.user._id,
        });
        const createdUser = await user.save();
        res.status(201).json(createdUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.createdBy.toString() === req.user._id.toString()) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found or you are not authorized' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.createdBy.toString() === req.user._id.toString()) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found or you are not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getUsers, createUser, updateUser, deleteUser };