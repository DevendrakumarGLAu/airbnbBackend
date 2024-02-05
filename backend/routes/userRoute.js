//backend/routes/userRoute.js
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtoken= 'hotelbookingapp';

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const lowercasedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowercasedEmail });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists. Please use a different email address.",
      });
    }

    const newUser = new User({ name, email: lowercasedEmail, password, isAdmin });
    const user = await newUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "An error occurred during registration." });
  }
});




router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, isAdmin: user.isAdmin, name: user.name },
        jwtoken,
        { expiresIn: "1h" }
      );
      console.log("User Object:", user);
      res.send({
        token,
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        name: user.name,
      });
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// router.post("/getallusers", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error });
//   }
// });
// router.post("/adminlogin", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await User.findOne({ email, password, isAdmin: true });

//     if (admin) {
//       const adminData = {
//         name: admin.name,
//         email: admin.email,
//         isAdmin: admin.isAdmin,
//         _id: admin._id,
//       };
//       res.send(adminData);
//     } else {
//       return res.status(400).json({ message: "Admin Login Failed" });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// });

module.exports = router;
