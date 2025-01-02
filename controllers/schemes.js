import Scheme from "../models/schemes.js"

const index = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1 // Get page number from query, default to 1
  const itemsPerPage = 30
  try {
    const totalItems = await Scheme.countDocuments() // Get total number of records
    const totalPages = Math.ceil(totalItems / itemsPerPage) // Calculate total pages
    const populatedSchemes = await Scheme.find()
      .skip((currentPage - 1) * itemsPerPage) // Skip previous pages' records
      .limit(itemsPerPage) // Limit to itemsPerPage
    // Calculate pagination limits
    const paginateLimit = 10 // Max number of page links to display
    const startPage = Math.max(1, currentPage - Math.floor(paginateLimit / 2)) // Starting page
    const endPage = Math.min(totalPages, startPage + paginateLimit - 1) // Ending page

    res.render("schemes/allSchemes", {
      populatedSchemes,
      currentPage,
      totalPages,
      startPage,
      endPage,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const newScheme = async (req, res) => {
  res.render("schemes/new.ejs")
}

const createSchemeFunc = async (req, res) => {
  // Check if user is authenticated
  if (!req.session.user) {
    return res.send("Unauthorized: Please log in.")
  }
  try {
    const createScheme = await Scheme.create(req.body)
    const allSchemes = await Scheme.find()
    res.redirect("/schemes", {
      createSchemes: allSchemes,
    })
  } catch (error) {
    console.log(error)
    res.send(error)
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

const dashBoard = async (req, res) => {
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
const allSchemesFunc = async (req, res) => {
  try {
    const allSchemesConst = await Scheme.find()
    res.render("schemes/allSchemes", { createScheme: allSchemesConst })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

export default {
  showSchemesList,
  dashBoard,
  allSchemesFunc,
  getById,
  deleteScheme,
  updateScheme,
  editScheme,
  createSchemeFunc,
  index,
  newScheme,
}
