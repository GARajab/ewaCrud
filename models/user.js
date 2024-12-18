import { Schema, model } from "mongoose"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  cpr: {
    type: String,
    required: true,
    minlength: [9, "Name must be more than 9 characters"],
    maxlength: [9, "Name must be less than or equal to 9 characters"],
  },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)
export default User
