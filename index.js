const { Router } = require("express")
const router = Router()
router.use("/employ", require("./employ"))
// router.use("/jobs", require("./jobs"))
module.exports = router