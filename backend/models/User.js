const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, validate: [isEmail] },
    phone: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin',
    },
}, { timestamps: true });

userSchema.index({ email: 1, createdBy: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;