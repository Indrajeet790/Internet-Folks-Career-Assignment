const jwt = require("jsonwebtoken"); 
const User = require("../Models/user");

// register a user
module.exports.SignUp = async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email});

    if (!user) {
      const newUser = await User.create(req.body);
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
    const user = await User.findOne({ email: req.body.email }); // Add 'await' here

    // Check if a user with the given email exists and if the provided password matches
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({ message: "Invalid userName/password" });
    }

        // Generate a new JWT token with the user's data as the payload, a secret key "codeial",
    // and set the token's expiration time to 1 day (24 hours)
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