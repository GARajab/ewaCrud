import { Router } from "express"
const router = Router()
import {
  showUsersList,
  // allUsersServices,
  showServices,
  index,
  newService,
  getById,
  createScheme,
  editServices,
  updateServices,
  deleteServices,
} from "../controllers/services.js"
import isSignedIn from "../middleware/is-sign-in.js"
import isAdmin from "../middleware/is-Admin.js"

router.get("/usersList", isSignedIn, isAdmin, showUsersList)
router.get("/otherUsers/:userID", isSignedIn, allUsersServices)
router.get("/dashBoard", isSignedIn, showServices)
router.get("/", isSignedIn, index)
router.get("/new", isSignedIn, newService)
router.get("/:schemeId", isSignedIn, getById)
router.post("/", isSignedIn, createService)
router.get("/:schemeId/edit", isSignedIn, editServices)
router.put("/:schemeId", isSignedIn, updateServices)
router.delete("/:schemeId", isSignedIn, deleteServices)
export default router
