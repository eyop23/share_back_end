const asyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const Shareholders=require('../model/share');
const  mongoose = require('mongoose');
//@private access(logged in user)

const updatepassword=asyncHandler(async (req, res) => {
  console.log(req.body)
  const {password}=req.body;
  const {id}=req.body;
  console.log(id);
  console.log(password);


  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
    console.log(shareholder._id.toString(),req.user.id);
  }
  const shareholder=await Shareholders.findById(id);
  if(!shareholder){
    res.status(400)
    throw new Error('shareholder not found')
  }
  if (!req.user) {
    res.status(401)
    throw new Error('Shareholder not logged IN!')
  }
  if(req.user.id !== shareholder._id.toString()){
    res.status(401)
    console.log(req.user.id,shareholder._id.toString());
    throw new Error('User not authorized')
  }
  const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    await Shareholders.findByIdAndUpdate({_id:id},{password:hashedPassword});
    res.status(200).json({ok:"password updated",hashedPassword});
})
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
// else{
//   res.send("id not matched");
//   console.log(shareholder._id.toString(),req.user.id);
// }
// const Login=require('../model/userlogin');
// // const getUser=asyncHandler(async (req,res)=>{
// //   const share=await Login.find();
// //   res.json(share);
// // })
// const registerShareholder = asyncHandler(async (req, res) => {
//   const {email, password } = req.body

//   if (!email || !password) {
//     res.status(400)
//     throw new Error('Please add all fields')
//   }

//   // Check if user exists
//   const userExists = await Login.findOne({ email })
//   if (userExists) {
//     res.status(400)
//     throw new Error('User already exists')
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)

//   // Create user
//   const user = await Login.create({
//     email,
//     password: hashedPassword,
//   })

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid user data')
//   }
// })
// const LoginUser=asyncHandler(async(req,res)=>{
//   const{email,password}=req.body;
//   if(!email || !password ){
//     res.status(404);
//     throw new Error('can not create');
//   }
//   const userExist=await Login.findOne({email});
//   if(userExist && (await bcrypt.compare(password,userExist.password))){
//     res.status(201).json({
//       _id:userExist.id,
//       email:userExist.email,
//       isAdmin:userExist.isAdmin,
//       token:generateToken(userExist._id),
//       // ok:"userloged"
//     })
//   }
//     else {
//       res.status(400).json({error:'Invalid Credentials'})
//      }
// }
// )
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '2d',
//   })
// }
module.exports={
    updatepassword,
    getMe
}
