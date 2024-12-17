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
// import schemesRoutes from "./routes/schemes.js"
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
connectDB()
app.use(express.urlencoded({ extended: false }))
app.use(methodOverRide("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
// Call the connect function to establish the connection

app.use("/auth", authRouter)
app.use(urlencoded({ extended: false }))
app.use(methodOverRide("_method"))
app.use(morgan("dev"))
app.set("view engine", "ejs")
app.use(getMessages)
app.use(passUserToView)
// app.use("/schemes", schemesRoutes)
app.get("/", async (req, res) => {
  //this for if user typed www.mohrajab.com then the auth/sign-in.ejs will be rendered (sign-in page)
  res.render("auth/sign-in.ejs")
})
// app.use("/hamada"),(req,res)=>{// so if we put any thing after the (/) then the user will se whatever in the nextline "in this case it is /hamada"
//   res.send("Hi My Name Is Hamada")
// }

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})
