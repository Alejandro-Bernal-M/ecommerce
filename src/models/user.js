const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  contactNumber: {
    type: String
  },
  profileImage: {
    type: String
  }
}, {timestamps: true})

UserSchema.virtual('password').set(function(password){
  this.hashPassword = bcrypt.hashSync(password, 12);
});

UserSchema.methods = {
  authenticate: function(password){
    return bcrypt.compareSync(password, this.hashPassword );
  }
}

module.exports = mongoose.model('User', UserSchema);