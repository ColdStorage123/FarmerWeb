const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Farmer', 'Manager', 'Admin'],
    default: 'Farmer',
  },
  /* role: {
    type: String, // Adjust the type accordingly (String, Enum, etc.)
    default: 'Farmer', // Set the default role if needed
  }, */
  resetPasswordCode: {
    type: String,
    default: null,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Encrypting user password before saving to the database using bcrypt
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  user.confirmPassword = await bcrypt.hash(user.confirmPassword, 8);
  next();
});
userSchema.methods.generateAuthToken = async function () {
  try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
  } catch (err) {
        console.log(err);
  }
}
const User = mongoose.model('User', userSchema);

module.exports = User; 