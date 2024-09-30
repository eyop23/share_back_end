//to connect to database we require mongoose
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const shareSchema=new schema({
    // image:{
    //     type:String,
    //     required:[true,"img filled is required"]
    // },
    firstname:{
        type:String,
        required:[true,"name filled is required"]
    },
    middlename:{
        type:String,
        required:[true,"name filled is required"]
    },
    lastname:{
        type:String,
        required:[true,"name filled is required"]
    },
            email:{
                type:String,
                required:[true,"name filled is required"] 
            },
                    shareamount:{
                        type:Number,
                        required:[true,"name filled is required"]
                        },
                        // paidbirr:{
                        //     type:Number,
                        //     required:[true,"name filled is required"]
                        //     }
},{
   timestamps:true
})
const oldshareholder=mongoose.model('ExistedShareholder',shareSchema);
module.exports=oldshareholder
