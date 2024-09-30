const multer  = require('multer')
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //where will be stored the images(in this case uploads folder)
    },
    filename: function (req, file, cb) {
      let ext =path.extname(file.originalname) //specify the filename by adding some prefix to avoid same image name wi be stored
      cb(null, Date.now() + ext)
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter:function(req,file,callback){
        if(file.mimetype == "image/jpeg" ||  file.mimetype == "image/png")
        {
            callback(null,true)
        }
        else{
            console.log(file.mimetype);
            callback(null,false); 
        }
        // console.log(file);
    },
    // limits:{
    //     fileSize:1024 * 1024 * 2
    // }
})
module.exports=upload