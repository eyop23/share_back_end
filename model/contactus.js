const mongoose=require('mongoose');
const schema=mongoose.Schema;
const contact=new schema({
    Name: {
        type:String,
    },
    Email: {
        type:String,
    }, 
    Message: {
        type:String,
    }, 
},
{
    timestamps:true,
})
const contactus=mongoose.model('ContactUs',contact);
module.exports=contactus;
