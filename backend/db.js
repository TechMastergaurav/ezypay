const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://mtechgaurav03:iB4QB0XeDhM9FlaM@cluster0.0xtlgy3.mongodb.net/paypal")

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const accountSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:"true"},
    balance:{type:Number,required:true}
})

const User=mongoose.model('User',userSchema);

const Account=mongoose.model('Account',accountSchema);

module.exports={
    User,
    Account
}