const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Login User
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Incorrect username or password", status: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ msg: "Incorrect username or password", status: false });
    }

    const userData = user.toObject();
    delete userData.password;

    return res.json({ msg: "Login successful", status: true, user: userData });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Register User
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.json({ msg: "Username already exists", status: false });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({ msg: "Email already registered, try login", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userData = user.toObject();
    delete userData.password;

    return res.json({ status: true, user: userData });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Get All Users
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "displayPicture",
      "_id",
    ]);

    return res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Logout User
module.exports.logOut = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ msg: "User ID is required to logout" });
    }

    return res.status(200).send({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
