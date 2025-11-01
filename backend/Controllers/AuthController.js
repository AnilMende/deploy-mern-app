const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {
    
    try{

        const { name, email, password} = req.body;

        const user = await UserModel.findOne({ email });

        if(user){
            return res.status(409).json({success:false, message:"User is already Exists"});
        }

        const userModel = await UserModel({name, email, password});
        // we are hashing the pwd using the bcrypt.hash with salt
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({success:true, message:"Signup Completed"})

    }catch(error){
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

const login = async (req, res) => {
    
    try{

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(403).json({ success:false, message: " Auth Failed, Incorrect email or password"})
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if(!isPassEqual){
            return res.status(403).json({success:false, message:"Auth Failed, Incorrect email or password"})
        }

        const jwtToken = jwt.sign({ email : user.email, _id:user._id}, 
                                                 process.env.JWT_SECRET, { expiresIn : '24h'})

        res.status(200).json({
            message:"Login Success",
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    }catch(error){
        res.status(500)
           .json({success:false, message:"Internal Server Error"});
    }
}

module.exports = {signup, login};