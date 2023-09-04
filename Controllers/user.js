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
