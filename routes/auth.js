import express from "express"
const router = express.Router()

import authController from "../controllers/auth.js"

router.get("/sign-up", authController.signup_get)
router.post("/sign-up", authController.signup_post)
router.get("/sign-in", authController.signin_get)
router.post("/sign-in", authController.signin_post)
router.get("/sign-out", authController.signout)

export default router
