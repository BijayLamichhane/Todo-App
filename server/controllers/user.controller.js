import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = async (userId) => {
  const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })

  return token;
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Please fill all the fields and password must be at least 6 characters long' });
    }
  
    const userExist = await User.findOne({email})
  
    if(userExist) {
      return res.json({success: false, message: 'User already exists'})
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = await generateToken(newUser._id.toString());


    res.status(201).json({success: true, message: 'User created successfully', token})

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message})
  }


}

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Please fill all the fields and password must be at least 6 characters long' });
    }

    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({success: false, message: 'User not found'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(400).json({success: false, message: 'Invalid password'})
    }

    const token = await generateToken(user._id.toString());
    res.status(200).json({success: true, message: 'User logged in successfully', token})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: error.message})
  }
}