import User from "../models/userModel.js";

export async function loginUser(req, res, next) {
  try {
    const {
      userInfo: { email, userName: name },
    } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email is mandatory",
      });
    }
    let user = await User.findOne({ email });
    // check if the user already exists
    if (user) {
      return res.status(200).json({
        status: "success",
        user,
      });

      // else create a new user
    } else {
      user = new User({ email, name });
      await user.save();
      if (user) {
        return res.status(201).json({
          status: "created",
          user,
        });
      } else {
        return res.status(400).json({
          status: "fail",
          message: "Cannot proceed with your request. Try again later",
        });
      }
    }
  } catch (error) {
    console.log("error occured while checking user", error);
    return res.status(500).json({
      status: "fail",
      message: "Cannot proceed with your request. Try again later",
    });
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().sort({ name: 1 });
    // console.log(users);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log("Error occured while getting contacts", error);
    res.status(500).json({
      message: "Failed to get contacts",
    });
  }
}
