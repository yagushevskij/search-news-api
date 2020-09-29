const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { errMessages } = require('../config');
const UnauthorizedError = require('../classes/UnauthorizedError');

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

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, pass) {
  const user = await this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(errMessages.wrongAuthData));
  const isPassCorrect = await bcrypt.compare(pass, user.password);
  if (isPassCorrect) {
    const { password, ...rest } = user.toJSON();
    return rest;
  }
  return false;
};

module.exports = mongoose.model('user', userSchema);
