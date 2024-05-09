import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHndler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({
        massage:"it is finally working",
    });
}



export const updateUser = async (req, res, next) => {
    // if (req.user.id !== req.params.id)
    //   return next(errorHndler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

export const deleteUser = async(req,res,next)=>{

    try {
      await User.findByIdAndDelete(req.params.id);
      // res.clearCookie('access_token');
      res.status(200).json('user has been deleted').clearCookie('access_token')
    } catch (error) {
      next(error);
    }
  };



  export const getUserListing = async(req,res,next)=>{
    try {
      const listing = await Listing.find({userRef:req.params.id});
      res.status(200).json(listing);
    } catch (error) {
      next(error)
    }
  };

  export const getUser =async(req,res,next)=>{
    try {
      const user =await User.findById(req.params.id);

      if(!user) return next(errorHndler(404,'user not found'));

      const{password:pass , ...rest} = user._doc;

      res.status(200).json(rest);
    } catch (error) {
      next(error)
    }
  }