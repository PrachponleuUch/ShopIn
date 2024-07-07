import express from 'express'
import { deleteUser, forgotPassword, getAllUsers, getUserDetails, getUserProfile, loginUser, logoutUser, registerUser, resetPassword, updateUser, updateUserPassword, updateUserProfile } from '../controllers/authControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';


const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)




export default router;