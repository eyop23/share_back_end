const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const AdminNews = require("../model/adminnews");
const stream = require("stream");
const cloudinary = require("cloudinary").v2;
// const createAdminNews=asyncHandler(async(req,res)=>{
//   const {title,content,author,description}=req.body;
//   if(!title || !content || !author|| !description){
//     res.status(404);
//     throw new Error("please fill all fields");
//   }
//   let admin=new AdminNews({
//     title:req.body.title,
//     content:req.body.content,
//     description:req.body.description,
//     author:req.body.author,
//   })
//   if(req.file){
//     admin.image=req.file.path
//     admin.save().then(()=>{
//       res.json({
//         message:"saved"
//       })
//     })
//     .catch((error)=>{
//       res.json({
//         message:"error"
//       })
//     })
//   }
// })
const createAdminNews = asyncHandler(async (req, res) => {
  const { title, content, author, description } = req.body;

  // Input validation
  if (!title || !content || !author || !description) {
    res.status(404);
    throw new Error("Please fill all fields");
  }

  // Create a new AdminNews object
  let admin = new AdminNews({
    title,
    content,
    description,
    author,
  });

  // If an image file is uploaded
  if (req.file) {
    try {
      // Stream the image upload to Cloudinary
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer); // Send file buffer to stream

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" }, // Specify the resource type as image
          (error, result) => {
            if (error) {
              return reject(new Error("Cloudinary upload failed"));
            }
            return resolve(result);
          }
        );
        bufferStream.pipe(uploadStream); // Pipe the file stream into the Cloudinary upload stream
      });

      // Set the image URL to the admin object
      admin.image = uploadResult.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }
  }

  // Save the admin news to the database
  admin
    .save()
    .then(() => {
      res.json({
        message: "News saved successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error saving the news",
      });
    });
});

const getAdminNews = asyncHandler(async (req, res) => {
  const news = await AdminNews.find();
  if (!news) {
    res.status(500);
    throw new Error("cannot fetch a news");
  }
  res.status(200).json(news);
});
const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no new found" });
  }
  const news = await AdminNews.findById(id);
  if (!news) {
    res.status(400);
    throw new Error("news not found");
  }
  await AdminNews.deleteOne({ _id: id });
  res.status(200).json({ id: id });
});
module.exports = {
  createAdminNews,
  getAdminNews,
  deleteNews,
};
