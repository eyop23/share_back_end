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
    // charge:{
    //     type:Number,
    //     required:[true, 'please add']
    // },
    // title:{
    //     type:String,
    //     required:[true, 'please add']
    // }
},
{
    timestamps:true,
})
const transaction=mongoose.model('Transaction',action);
module.exports=transaction;
