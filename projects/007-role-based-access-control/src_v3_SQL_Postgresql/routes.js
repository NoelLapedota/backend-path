const {Routes, Router } = require('express')
const authorization = require('./access_midd')

const router = Router()
const {
    getUsers,
    chechEmailExist,
    addUser,
    deleteUser,
    updateUser,
} = require('./models/queries')

const controller = require ('./controller')



//sigin
router.post('/sigin',controller.addUser)

//login
router.post('/login',controller.login)

//dashboard
router.get('/dashboard', authorization.authorization, controller.dashboard)

//update
router.put('/update', authorization.authorization, controller.update)

//admin
router.get('/admin', authorization.authorization, controller.admin)

//logout
router.get('/logout', controller.logout)



module.exports = router
