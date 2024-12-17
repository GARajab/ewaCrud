import express from "express"
import { findByIdAndUpdate } from "../models/user"
import Services, { find, findById, create } from "../models/services"

// const bcrypt = require("bcrypt")
// const isSignedIn = require("../middleware/is-sign-in")

// controllers/carriersController.js
export async function showCarriersList(req, res) {
  try {
    const servicesToSelect = await find({ IMEI: null })
    res.render("../views/services/carriersList.ejs", {
      services: servicesToSelect,
    }) // Ensure your view engine is set up correctly
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

export async function showPurchasedServicesList(req, res) {
  if (!req.session.user) {
    return res.send("Unauthorized: Please log in.")
  }
  try {
    const service = await findById(req.body.nameOfServiceID)

    if (!service) {
      return res.status(404).send("Service not found.")
    }
    if (
      req.session.user.balance === 0 ||
      req.session.user.balance < req.body.price
    ) {
      return res.send("Your Balance is Not Enogh To Purchase This Service")
    } else {
      const addnewService = new Services({
        nameOfService: service.nameOfService,
        price: req.body.price,
        IMEI: req.body.IMEI,
        userServSelected: req.session.user._id,
        orderStatus: "pending",
      })
      req.session.user.balance -= req.body.price
      await findByIdAndUpdate(req.session.user._id, {
        balance: req.session.user.balance,
      })
      await create(addnewService)
      res.redirect(`/services/otherUsers/${req.session.user._id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Error assign service to current session user.")
  }
}

export async function addFundGet(req, res) {
  if (!req.session.user) {
    return res.redirect("/login") // Redirect to login if not logged in
  }
  res.render("../views/services/addFund.ejs", { user: req.session.user })
}

// Handle the adding of funds
export async function addFundPost(req, res) {
  const { amount, cardNumber, expiryDate, cvc } = req.body

  // Simulate payment processing
  if (!req.session.user) {
    return res.status(401).send("Unauthorized. Please log in.")
  }

  // Here you would normally process the payment via some payment gateway.
  // For simulation purposes, we skip this and directly update the balance.

  try {
    const addedAmount = parseFloat(amount)
    req.session.user.balance += addedAmount // Update session balance

    // Update user balance in MongoDB
    await findByIdAndUpdate(req.session.user._id, {
      balance: req.session.user.balance,
    })

    // Redirect to dashboard after successful payment
    res.redirect("/services/dashboard")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error.")
  }
}
