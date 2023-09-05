const jwt = require("jsonwebtoken"); 
const User = require("../Models/user");
const bcrypt=require("../config/bcrypt")
;

// register a user
module.exports.SignUp = async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email});

    if (!user) {
        // Hash the user's password before storing it in the database
        const hashedPassword = await bcrypt.hashPassword(req.body.password);
      // Create a new user with the hashed password
      const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password: hashedPassword, // Store the hashed password
      });
      
      return res.status(200).json({ newUser });
    } else {
      return res.status(200).json({ message: "user is already exits" });
    }
  } catch (err) {
    console.log("error", err);
  }
};

// Create a session by verifying user credentials and generating a JWT token
module.exports.SignIn = async (req, res) => {
  try {
    // Find a user in the database based on the provided email
    const user = await User.findOne({ email: req.body.email }); 

    // Check if a user with the given email exists
    if (!user) {
      return res.status(422).json({ message: "Invalid username/password" });
    }

    // Verify the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.comparePasswords(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(422).json({ message: "Invalid username/password" });
    }
  // Generate a new JWT token with the user's data as the payload, a secret key "mySecret",
    const token = jwt.sign(user.toJSON(), "mySecret", { expiresIn: "1d" });

    return res.status(200).json({
      message: "Sign in successful. Here is your token. Please keep it safe!",
      data: {
        token: token,
      },
    });
  } catch (err) {
    console.log("*************", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};