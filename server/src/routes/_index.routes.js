const {Router} = require("express")
const userRouter = require("./user.routes")
const ItemRouter = require("./item.routes")

const router = Router()

router.use("/user/",userRouter)
router.use("/item/", ItemRouter)

module.exports = router