const mongoose=require('mongoose');
const schema=mongoose.Schema;
const news=new schema({
    image: {
        type:String,
    },
    title: {
        type:String,
        required:[true, 'please add title']
    },
    content: {
        type:String,
        required:[true, 'please add content']
    }, 
    description: {
        type:String,
        required:[true, 'please add description']
    }, 
    author: {
        type:String,
        required:[true, 'please add author']
    },
},
{
    timestamps:true,
})
const AdminNews=mongoose.model('AdminNew',news);
module.exports=AdminNews;
