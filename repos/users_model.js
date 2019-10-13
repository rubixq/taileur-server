const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    msisdn: { type: String, unique: true },
    locale: String,
    password: String,
    authToken: String
}, { timestamps: true });

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err);
});

userSchema.methods.comparePassword = function (givenPassword, next) {
    bcrypt.compare(givenPassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.password;
    delete obj.__v;

    return obj;
};

module.exports = mongoose.model("User", userSchema);