import express from "express"
import isAdmin from "../middleware/is-Admin.js"
import isSignedIn from "../middleware/is-sign-in.js"
import schemesRouter from "../controllers/services.js"

const router = express.Router()

router.get("/schemesList", isSignedIn, isAdmin, schemesRouter.showSchemesList)
router.get(
  "/otherScheme/:schemeId",
  isSignedIn,
  schemesRouter.allSchemesServices
)
router.get("/dashBoard", isSignedIn, schemesRouter.showSchemes)
router.get("/", isSignedIn, schemesRouter.index)
router.get("/new", isSignedIn, schemesRouter.newScheme)
router.get("/:schemeId", isSignedIn, schemesRouter.getById)
router.post("/", isSignedIn, schemesRouter.createScheme)
router.get("/:schemeId/edit", isSignedIn, schemesRouter.editScheme)
router.put("/:schemeId", isSignedIn, schemesRouter.updateScheme)
router.delete("/:schemeId", isSignedIn, schemesRouter.deleteScheme)

export default router
