import express from "express";
import { deleteUser, test, updateUser, getUserListing ,getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();


router.get('/test',test )
router.post('/update/:id', updateUser )
router.delete('/delete/:id',deleteUser )
router.get('/listings/:id' ,getUserListing)
router.get('/:id' ,getUser)

export default router

