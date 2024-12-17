import { Router } from "express"
import { hashSync, compareSync } from "bcrypt"
import messages from "../middleware/display-message.js"
import session from "express-session"
import User from "../models/user.js"

const router = Router()

const signup_get = (req, res) => {
  res.render("auth/sign-up")
}

const signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ cpr: req.body.cpr })
  if (userInDatabase) {
    return res.send("CPR already in database")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords do not match")
  }
  try {
    const hashedPassword = hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const cpr = await User.create(req.body)
    req.session.messages = `Thank You ${req.body.cpr} Now You Can Sign In`
    res.redirect("/auth/sign-in")
  } catch (err) {
    console.log(err)
    return res.send(
      "Failed To Create User. Please Try Again Or Call The Admin On 17991236."
    )
  }
}

const signin_get = (req, res) => {
  res.render("auth/sign-in.ejs")
}

const signin_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ cpr: req.body.cpr })
    if (!userInDatabase) {
      return res.redirect("/auth/sign-in")
    }
    const validPassword = compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send("Login Failed. Please try again.")
    }
    req.session.user = {
      cpr: userInDatabase.cpr,
      _id: userInDatabase._id,
      email: userInDatabase.email,
    }
    res.locals.messages = `Welcome Back ${req.session.user.cpr}`
    res.render("schemes/dashBoard", {
      cpr: req.session.user,
      messages: res.locals.messages,
    })
    console.log("User in Database:", userInDatabase)
    console.log("Valid Password:", validPassword)
    console.log("Session User Before Assignment:", req.session.user)
  } catch (err) {
    console.log(err)
    res.redirect("/auth/sign-in")
  }
}

const signout = (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

export default {
  signout,
  signin_post,
  signin_get,
  signup_post,
  signup_get,
  router,
}
