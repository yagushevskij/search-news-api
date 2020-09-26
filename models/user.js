const mongoose = require('mongoose');
const { errMessages } = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  email: {
    type: String,
    unique: true,
    required: [true, errMessages.fieldRequired],
  },
  password: {
    type: String,
    required: [true, errMessages.fieldRequired],
    select: false,
  },
});

userSchema.statics.createUser = async function createUser(obj) {
  const user = await this.create(obj);
  const { password, ...rest } = user.toJSON();
  return rest;
};

module.exports = mongoose.model('user', userSchema);
