import { config } from "dotenv"
config()
import express, { urlencoded } from "express"
const app = express()
import session from "express-session"
import { connect } from "mongoose"
import methodOverRide from "method-override"
import morgan from "morgan"
import passUserToView from "./middleware/pass-user-to-view.js"
import authRouter from "./routes/auth.js"
import schemesRoutes from "./routes/schemes.js"
import getMessages from "./middleware/display-message.js"

const port = process.env.PORT ? process.env.PORT : 3000

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    console.log("Database is connected!")
  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1) // Exit process with failure
  }
}

// Call the connect function to establish the connection
connectDB()

app.use(urlencoded({ extended: false }))
app.use(methodOverRide("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.set("view engine", "ejs")
app.use(getMessages)
app.use(passUserToView)
app.use("/auth", authRouter)
app.use("/schemes", schemesRoutes)
app.get("/", async (req, res) => {
  res.render("auth/sign-in.ejs")
})

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})
