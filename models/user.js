const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isAdmin : { /**Porvjera kad je user 'log in' da li je admin, ako jeste da omoguci admin panel */
        type: Boolean,
        default: false /**inicijalno je false */
    }
}, {
    timestamps: true, /**ovo govori mongoose da upisuje automatski datum kreiranja i azuriranja */
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel // exportovali smo userModel i u drugim fajlovima ga mozemo koristiti pomocu require