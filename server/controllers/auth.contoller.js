import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHndler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcryptjs.hashSync(password, 12)
  const newUser = new User({ username, email, password: hashPassword });
  try {

    await newUser.save();
    res
      .status(201)
      .json("user created successfully");
  } catch (error) {
    next(errorHndler(550, 'error due to your email or username'));
  }

};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(errorHndler(404, 'user not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHndler(401, 'wrong try again '));
    const token = Jwt.sign({ id: validUser._id }, 'dsfjkfsfffjkeif1s15');
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access-token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
  catch (error) {
    next(error);
  }
};

export const signOut= async(req ,res,next) =>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('user has been logged out');
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = Jwt.sign({ id: user._id }, 'dsfjkfsfffjkeif1s15');
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access-token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const genratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPass = bcryptjs.hashSync(genratedPassword, 10)
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPass ,avatar:req.body.photo});
      await newUser.save();
      const token = Jwt.sign({ id: user._id }, 'dsfjkfsfffjkeif1s15');
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access-token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}