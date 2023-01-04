const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: { type: String, required: [true, 'You must supply an email address'], unique: true },
        password: { type: String, required: [true, 'you must supply a password']}
    },
    { timestamps: true}
);

userSchema.pre('save', async function (next) {
    //logging
    console.log(this.password);
    try{
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
    
})

module.exports = mongoose.model("User", userSchema);
