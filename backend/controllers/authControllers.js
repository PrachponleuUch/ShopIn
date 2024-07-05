import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import assignToken from "../utils/assignToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import user from "../models/user.js";

// Register User ==> /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({ 
    name, 
    email, 
    password 
  })

  assignToken(user, 201, res)
})

// Login User ==> /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorHandler('Please enter both email and password', 400))
  }

  // Find user in DB
  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  // Compare password
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401))
  }

  assignToken(user, 201, res)
})

// Logout User ==> /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {

  // Delete the cookie to log user out
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    message: "Logged out"
  })
})

// Forgot Password ==> /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find user in DB
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler('No user found with this email', 404))
  }

  // Get reset password token
  const resetToken = await user.getResetPasswordToken()

  await user.save()

  // Create reset password URL
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`

  const message = getResetPasswordTemplate(user?.name, resetUrl)

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIN Password Recovery',
      message
    })

    res.status(200).json({
      message: `Email sent to: ${user?.email}`
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    return next(new ErrorHandler(error?.message, 500))
  }
})

// Reset Password ==> /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash Url token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or expired', 400))
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords does not match', 400))
  }

  // Set new password
  user.password = req.body.password

  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  assignToken(user, 200, res)
})

// Get current user profile ==> /api/v1/me
export const getUserProfile = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req?.user?._id)
  res.status(200).json({
    user
  })
})

// Update user password ==> /api/v1/password/update
export const updateUserPassword = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password")

  // Check if the previous user password is correct
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400))
  }

  user.password = req.body.password
  user.save()
  res.status(200).json({
    success: true
  })
})

// Update user profile ==> /api/v1/me/update
export const updateUserProfile = catchAsyncErrors(async(req, res, next) => {
  const newUserData = {
    name: req?.body?.name,
    email: req?.body?.email
  }
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, { new: true})
  
  res.status(200).json({
    user
  })
})