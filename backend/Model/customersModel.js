const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//SCHEMA
const customerSchema = new Schema({
    UserID:String,
    Password:String,
    Firstname:String,
    Lastname:String
})

customerSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.Password, 10).then(hash => {
        user.Password = hash
        next()
    }).catch(error =>{
        console.error(error)
    })
})

module.exports = mongoose.model("customers",customerSchema)

