const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var JWT_SECRET = 'thisIsagood$secret'
var fetchuser = require('../middleware/fetchuser');

// Route 1:  create a user using:  POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:5}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min:5})

], async(req, res)=> {
    // if there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //check wheather the user with same email exist
    try {
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({error: "Sorry a use with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

    });
    const data = {
        user: {id: user.id} 
    }
    const authToken = jwt.sign(data, JWT_SECRET);
res.json(authToken)}
catch (error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
});


// Route 2: Login using:  POST "/api/auth/login". Doesn't require Auth
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async(req, res)=> {

 // if there are errors return bad requests
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
 }
 const{email, password} = req.body;
 try{
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Try a correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return res.status(400).json({error: "Try a correct credentials"});
    }
    const payload = {
        user: {id: user.id} 
    }
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({authToken});
 } catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
 }
});

// Route 3: Get Logged in user details:  POST "/api/auth/getuser". require Auth
router.post('/getuser', fetchuser, async(req, res)=> {
try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({user});
} catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})
module.exports = router