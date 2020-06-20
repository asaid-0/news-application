const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 64
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is Invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        hidden: true,
        validate(password) {
            const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
            if (!passwordRegEx.test(password)) {
                throw new Error('weak Password');
            }
        }
    },
    sources: [
        {
            type: String, trim: true
        }
    ]

}, { timestamps: true });


/**
 * Checks if email is already exists.
 *
 * @param {string} email User's Email.
 * @return {Promise<boolean>} Promise object that resolves to a boolean.
 */
userSchema.static('isEmailExists', async function (email) {
    const user = await this.findOne({ email });
    return !!user;  // convert user object to boolean
});


/**
 * Checks if password matching with one stored in database.
 *
 * @param {string} password User's Password.
 * @return {Promise<boolean>} Promise object that resolves to a boolean.
 */
userSchema.method('checkPassword', function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
});


/**
 * Subscribe to a news source.
 *
 * @param {string} sourceId News Source Id.
 * @return {Object} Returns user document object or false.
 */
userSchema.method('subscribe', function (source) {
    const user = this;
    user.sources.push(source);
    return user.save()
        .then(userDoc => {
            return userDoc;
        })
        .catch(err => {
            console.error("Error updating sources: ", err);
            return false;
        });
});


/**
 * Unsubscribe from a news source.
 *
 * @param {string} sourceId News Source Id.
 * @return {Object} Returns user document object or false.
 */
userSchema.method('unsubscribe', function (source) {
    const user = this;
    user.sources.pull(source);
    return user.save()
        .then(userDoc => {
            return userDoc;
        })
        .catch(err => {
            console.error("Error updating sources: ", err);
            return false;
        });
});

// hash password using pre hook (middleware)
userSchema.pre('save', async function (next) {
    const user = this;
    const saltRounds = 8; // used to generate salt with a cost factor to harden bruteforcing
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }

    if (user.isNew) {
        this.sources = []
    }
    else if (user.isModified('sources')) {
        // store sources list sorted and unique that will help in caching
        this.sources = _.uniq(_.sortBy(this.sources));
    }
    next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;