const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;
require('mongoose-type-email');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      maxlength: 16,
      required: true,
      index: true,
      unique: true
    },
    emailAddress: {
      type: mongoose.SchemaTypes.Email,
      required: true
    },
    identityNumber: {
      type: String,
      maxlength: 16,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'member',
      required: true
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
