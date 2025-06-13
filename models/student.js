const mongoose= require('mongoose')

const studentschema = mongoose.Schema({
    rollno:String,
    name:String,
    section:String,
    department:String
})

module.exports= mongoose.model('Student',studentschema)