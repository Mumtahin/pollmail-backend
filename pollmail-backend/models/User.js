const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    firstName: String,
    surname: String
});

mongoose.model('users', userSchema);