import User from "../models/user.js"
import Scheme from "../models/schemes.js"
const index = async (req, res) => {
  try {
    const populatedSchemes = await User.find()
    res.render("schemes/new.ejs")
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const newScheme = async (req, res) => {
  res.render("schemes/new_wiz.ejs")
}

const createScheme = async (req, res) => {
  // Check if user is authenticated
  if (!req.session.scheme) {
    return res.send("Unauthorized: Please log in.")
  }

  req.body.userSchemeSelected = req.session.scheme._id

  try {
    const addnewScheme = new Scheme({
      schemeRefrence: req.body.schemeRefrence,
      block: req.body.block, // Adding the reference to the User
    })
    await Scheme.create(req.body)
    if (req.session.user.cpr === "Admin") {
      res.redirect("/schemes")
    } else {
      // Ensure `Recipe` model is imported correctly
      res.redirect(`/schemes/otherUsers?userId=${req.session.scheme._id}`)
    }
  } catch (error) {
    res.status(500).send("Error creating Scheme.")
  }
}

const editScheme = async (req, res) => {
  try {
    const currentScheme = await Scheme.findById(req.params.schemeId)
    res.render("schemes/edit.ejs", {
      schemes: currentScheme,
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const updateScheme = async (req, res) => {
  try {
    const currentScheme = await Scheme.findById(req.params.schemeId)
    await currentScheme.updateOne(req.body)
    res.redirect("/schemes")
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const deleteScheme = async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.schemeId)
    if (req.session.user.username == "Admin") {
      res.redirect("/schemes")
    } else {
      res.redirect(`/schemes/otherUsers?userId=${req.session.user._id}`)
    }
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
}

const getById = async (req, res) => {
  try {
    const populatedSchemes = await Scheme.findById(
      req.params.schemeId
    ).populate("userSchemeSelected")
    User.equal(req.session.user._id)
    res.render("schemes/dashBoard.ejs", { services: populatedSchemes })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const showSchemes = async (req, res) => {
  try {
    const populatedSchemes = await Scheme.find({}).populate(
      "userSchemeSelected"
    )

    res.render("schemes/dashBoard", {
      services: populatedSchemes,
      messages: res.locals.messages,
    }) // Render a views file called show.ejs
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const showSchemesList = async (req, res) => {
  try {
    const allUsers = await Scheme.find()

    res.render("schemes/usersList.ejs", { users: allUsers })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}
const allSchemesServices = async (req, res) => {
  try {
    const userId = req.params.userID

    if (!userId) {
      return res.status(400).send("User ID is required.")
    }

    const allSchemesServicess = await Services.find({
      allShemesServices: userId,
    }).populate("allSchemesServicess")
    res.render("schemes/allServices", { services: allSchemesServicess })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

export default {
  showSchemesList,
  showSchemes,
  allSchemesServices,
  getById,
  deleteScheme,
  updateScheme,
  editScheme,
  createScheme,
  index,
  newScheme,
}
