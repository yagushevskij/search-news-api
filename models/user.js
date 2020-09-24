const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательное поле'],
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

userSchema.statics.createUser = async function createUser(obj) {
  const user = await this.create(obj);
  const { password, ...rest } = user.toJSON();
  return rest;
};

module.exports = mongoose.model('user', userSchema);
