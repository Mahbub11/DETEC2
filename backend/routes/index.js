const router = require("express").Router();
const moduleRoute= require('./moduleRoute')
const commonRoute= require('./commonRoute')
const authRoute= require('./authRoute')
const profileRoute= require('./profileRoute')

// auth
router.use('/api/v1/auth',authRoute)
//profile
router.use('/api/v1/profile',profileRoute)

router.use('/api/v1/module',moduleRoute)
router.use('/crete-signed-url',commonRoute)
router.use('/delete-img',commonRoute)


module.exports= router