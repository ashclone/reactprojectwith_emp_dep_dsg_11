const mongoose=require('mongoose')

const depSchema=mongoose.Schema({
    name:String
})

const depObj=mongoose.model('department',depSchema);
module.exports=depObj;