import express from 'express'
import { forgotPassword, getUserProfile, loginUser, logoutUser, registerUser, resetPassword, updateUserPassword, updateUserProfile } from '../controllers/authControllers.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';


const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile)






export default router;