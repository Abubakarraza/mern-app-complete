const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is already taken'],
    // validate(value) {
    //     if (!validator.isEmail(value)) {
    //         throw new Error("Email is invalid");
    //     }
    // }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
  },

  messages: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        trim: true,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,

    default: Date.now(),
  },

  // tokens:{
  //     type:String,
  //     required:true,

  // }
});
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY);

    this.tokens = this.tokens.concat({ token: token });
    // console.log("hello this is token",token);
    await this.save();
    // console.log("🚀 ~ file: userSchema.js ~ line 82 ~ token", token)
    // console.log("🚀 ~ file: userSchema.js ~ line 74 ~ token", token)
    return token;
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.addmessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
  } catch (error) {
    console.log(error);
  }
};
const User = new mongoose.model('REGISTER', userSchema);
module.exports = User;
