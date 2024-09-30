//to connect to database we require mongoose
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const buyerSchema=new schema({
    image:{
        type:String,
        // required:[true,"img filled is required"]
    },
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
    country:{
    type:String,
    required:[true,"name filled is required"]
    },
    city:{
        type:String,
        required:[true,"name filled is required"]
        },
        subcity:{
        type:String,
        required:[true,"name filled is required"]
        },
        wereda:{
            type:String,
            required:[true,"name filled is required"]
            },
            email:{
                type:String,
                required:[true,"name filled is required"] 
            },
            password:{
                type:String,
                required:[true,"name filled is required"] 
            },
            houseNo:{
                type:String,
                required:[true,"name filled is required"]
                },
                phoneNo:{
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
const buyers=mongoose.model('newBuyer',buyerSchema);
module.exports=buyers;
