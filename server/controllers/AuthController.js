import User from "../models/userModel.js";

export const checkUserExists = async (req, res, next) => {
  console.log("in the authcontroller");
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email is required",
      });
    }
    let newUser = await User.findOne({ email });
    res.status(200).json({
      status: "success",
      data: newUser,
    });
    /*
    if (newUser) {
      console.log(newUser);
      res.status(200).json({
        status: "success",
        data: newUser,
      });
      // UPDATE LATER TO 401
    } else {
      res.status(401).json({
        // status: "fail",
        statusCode:401,
        data: null,
      });
      // newUser = createUser({ email });
      // console.log(newUser);
      // other actions
    }
    */
  } catch (error) {
    console.log(error);
  }
  // next();
};

const createUser = async ({ email }) => {
  const newUser = new User({ email });
  await newUser.save();
  return newUser;
};
