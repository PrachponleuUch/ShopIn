import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import assignToken from "../utils/assignToken.js";
import ErrorHandler from "../utils/errorHandler.js";

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