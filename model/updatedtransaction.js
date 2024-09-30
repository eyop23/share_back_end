const mongoose=require('mongoose');
const schema=mongoose.Schema;
const action=new schema({
    first_name: {
        type:String,
        required:[true, 'please add firstname']
    },
    last_name: {
        type:String,
        required:[true, 'please add lastname']
    },
    email: {
        type:String,
        required:[true, 'please add email']
    }, 
    currency: {
        type:String,
        required:[true, 'please add']
    }, 
    amount: {
        type:Number,
        required:[true, 'please add author']
    },
},
{
    timestamps:true,
})
const shareTransaction=mongoose.model('ShareholderTransaction',action);
module.exports=shareTransaction;
