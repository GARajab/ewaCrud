// import express from "express"
// import User from "../models/user.js"

// const index = async (req, res) => {
//   try {
//     const populatedSchemes = await User.find()
//     res.render("schemes/allServices.ejs")
//   } catch (err) {
//     console.log(err)
//     res.redirect("/")
//   }
// }

// const newService = async (req, res) => {
//   res.render("services/new.ejs")
// }

// const createScheme = async (req, res) => {
//   // console.log(req.body)

//   // Check if user is authenticated
//   if (!req.session.user) {
//     return res.send("Unauthorized: Please log in.")
//   }

//   req.body.userServSelected = req.session.user._id

//   try {
//     const addnewScheme = new Services({
//       schemeRefrence: req.body.schemeRefrence,
//       block: req.body.block, // Adding the reference to the User
//     })
//     await Services.create(req.body)
//     if (req.session.user.cpr === "Admin") {
//       res.redirect("/schemes")
//     } else {
//       // Ensure `Recipe` model is imported correctly
//       res.redirect(`/schemes/otherUsers?userId=${req.session.user._id}`)
//     }
//   } catch (error) {
//     res.status(500).send("Error creating Scheme.")
//   }
// }

// const editServices = async (req, res) => {
//   try {
//     const currentService = await Services.findById(req.params.serviceId)
//     res.render("services/edit.ejs", {
//       services: currentService,
//     })
//   } catch (error) {
//     console.log(error)
//     res.redirect("/")
//   }
// }

// const updateServices = async (req, res) => {
//   try {
//     const currentService = await Services.findById(req.params.serviceId)
//     await currentService.updateOne(req.body)
//     res.redirect("/services")
//   } catch (error) {
//     console.log(error)
//     res.redirect("/")
//   }
// }

// const deleteServices = async (req, res) => {
//   try {
//     await Services.findByIdAndDelete(req.params.serviceId)
//     if (req.session.user.username == "Admin") {
//       res.redirect("/services")
//     } else {
//       res.redirect(`/services/otherUsers?userId=${req.session.user._id}`)
//     }
//   } catch (error) {
//     console.error(error)
//     res.redirect("/")
//   }
// }

// const getById = async (req, res) => {
//   try {
//     const populatedServices = await Services.findById(
//       req.params.serviceId
//     ).populate("userServSelected")
//     User.equal(req.session.user._id)
//     res.render("services/dashBoard.ejs", { services: populatedServices })
//   } catch (error) {
//     console.log(error)
//     res.redirect("/")
//   }
// }

// const showServices = async (req, res) => {
//   try {
//     const populatedServices = await Services.find({}).populate(
//       "userServSelected"
//     )

//     res.render("schemes/dashBoard", {
//       services: populatedServices,
//       messages: res.locals.messages,
//     }) // Render a views file called show.ejs
//   } catch (err) {
//     console.log(err)
//     res.redirect("/")
//   }
// }

// const showUsersList = async (req, res) => {
//   try {
//     const allUsers = await User.find()

//     res.render("services/usersList.ejs", { users: allUsers })
//   } catch (err) {
//     console.log(err)
//     res.redirect("/")
//   }
// }
// const allUsersServices = async (req, res) => {
//   try {
//     const userId = req.params.userID

//     if (!userId) {
//       return res.status(400).send("User ID is required.")
//     }

//     const allUsersServices = await Services.find({
//       userServSelected: userId,
//     }).populate("userServSelected")
//     res.render("services/allServices", { services: allUsersServices })
//   } catch (err) {
//     console.log(err)
//     res.redirect("/")
//   }
// }

// export default {
//   allUsersServices,
//   showUsersList,
//   showServices,
//   getById,
//   deleteServices,
//   updateServices,
//   editServices,
//   createScheme,
//   index,
//   newService,
//   createScheme,
//   addnewScheme,
// }
