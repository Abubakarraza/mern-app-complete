const mongoose =require('mongoose');
const {ObjectId} =mongoose.Schema.Types;
const Schema=new mongoose.Schema({
Fname:{
    type:String,
    required:true,
},
Sname:{
    type:String,
    required: true
},
phone:{
    type:Number,
    required:true
},
crudBy:{
    type:ObjectId,
    ref:"REGISTER"
}
});
const crud=new mongoose.model("CRUD",Schema);
module.exports=crud;