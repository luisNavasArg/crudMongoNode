import { Schema, model, Mongoose } from 'mongoose'
import mongoose = require('mongoose')
const datos = new mongoose.Schema ({

    user:{
        type: String,
        required:true,
        trim:true
    },

    nombre:{
        type: String,
        trim:true
    },
    apellido:{
        type: String,
        trim:true
    },
    mail:{
        type: String,
        trim:true
    },
    pass:{
        type: String,
        required:true,
        trim:true
    }

});

module.exports = mongoose.model('datos',datos)
