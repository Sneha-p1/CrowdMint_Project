const express = require ('express')
const router = express.Router();
const User = require ('../model/user')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_token_user = process.env.JWT_SECRET_USER;

router.post('/signup', async (req,res) => {
    try{
        const userDet= req.body;
        const name = userDet.name;
        const password = userDet.password;
        const email = userDet.email;
        const hashpassword = await bcrypt.hash(password,5)
        const user = new User({name,password:hashpassword, email});
        await user.save();
        res.status(201).json({ message: "User saved Successfully"});
    }catch(error){
        console.log("Error",error)
        res.status(500).json({ message:' Registration Failed'})
    }
});

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user, "user");
        if (!user) {
          return res
            .status(401)
            .json({ error: "Authentication failed- User doesn't exists" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ error: "Authentication failed- password doesn't match" });
        }
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email},
            jwt_token_user,
            {expiresIn: "1h",}
          );
          
          res.cookie("Authtoken", token);
          res.json({
          status: true,
          message: "login success",
          token,
    });
    return res;
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
    res.clearCookie("Authtoken");
    res.status(200).send("Logout successful");
    return res;
  });
  
  module.exports = router;