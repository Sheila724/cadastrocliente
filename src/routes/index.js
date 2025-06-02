const express = require('express')
const router = express.Router()

const clientRoutes = require('./clientRoutes')
const authRoutes = require('./authRoutes')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res) => res.redirect('/login'))

router.use('/clients', authMiddleware, clientRoutes)
router.use('/', authRoutes)
router.use('/toughts', authMiddleware, clientRoutes);

module.exports = router
