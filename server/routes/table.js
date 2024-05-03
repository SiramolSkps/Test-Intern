const express = require("express")
const router = express.Router()
const {create, getAllUsers,singleUser,remove,update} = require("../controllers/tableController")

router.post('/create',create)
router.get('/users',getAllUsers)
router.get('/user/:slug', singleUser)
router.delete('/user/:slug',remove)
router.put('/user/:slug',update)

module.exports=router
