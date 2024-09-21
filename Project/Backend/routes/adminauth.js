const express = require ('express')
const router = express.Router();
const Admin = require ('../model/admin')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_token_admin = process.env.JWT_SECRET_ADMIN;


router.post('/adminsignup', async (req,res) => {
  try{
      const userDet= req.body;
      const email = userDet.email;
      const password = userDet.password;
      const hashpassword = await bcrypt.hash(password,5)
      const user = new Admin({email,password:hashpassword});
      await user.save();
      res.status(201).json({ message: "Admin Added Successfully"});
  }catch(error){
      console.log("Error",error)
      res.status(500).json({ message:' Registration Failed'})
  }
});

router.post('/adminlogin', async(req,res) =>{
    try{
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });
        if (!user) {
            return res
              .status(401)
              .json({ error: "Authentication failed- Admin doesn't exists" });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ error: "Authentication failed - Password doesn't match" });
        }
        const admintoken = jwt.sign(
        { userId: user._id, email: user.email},
        jwt_token_admin,
        {expiresIn: "1h",}
      );
      
      res.cookie("Admintoken", admintoken);
      res.json({
      status: true,
      message: "login success",
      admintoken,
});
return res;

} catch (error) {
console.log(error);
res.status(500).json({ error: "Login failed" });
}
});

router.get("/logout", (req, res) => {
    res.clearCookie("Admintoken");
    res.status(200).send("Logout successful");
    return res;
  });
  
  module.exports = router;