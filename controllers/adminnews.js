const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const AdminNews = require('../model/adminnews');
const createAdminNews=asyncHandler(async(req,res)=>{
  const {title,content,author,description}=req.body;
  if(!title || !content || !author|| !description){
    res.status(404);
    throw new Error("please fill all fields");
  }
  let admin=new AdminNews({
    title:req.body.title,
    content:req.body.content,
    description:req.body.description,
    author:req.body.author,
  })
  console.log("df")
  if(req.file){
    admin.image=req.file.path
    admin.save().then(()=>{
      res.json({
        message:"saved"
      })
    })
    .catch((error)=>{
      res.json({
        message:"error"
      })
    })
  }
})
const getAdminNews=asyncHandler(async(req,res)=>{
  const news=await AdminNews.find();
  if(!news){
    res.status(500)
    throw new Error('cannot fetch a news')
  }
  res.status(200).json(news);
})
const deleteNews=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no new found'})
  }
  const news = await AdminNews.findById(id)
  if (!news) {
    res.status(400)
    throw new Error('news not found');
  }
  await AdminNews.deleteOne({_id:id})
  res.status(200).json({ id:id })
})
module.exports={
    createAdminNews,
    getAdminNews,
    deleteNews
}

