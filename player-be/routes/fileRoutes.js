const express = require('express')
const { getAllFile, createFileUpload, getByFileName, uploadfile, getAllFiles } = require('../controllers/fileControllers.js')
const fileUpload = require('../middleware/fileUpload.js')
const { verifyAdmin } = require('../utils/verifyToken.js')
const router = express.Router()

router.route('/').get(getAllFiles)
router.route('/upload').post(verifyAdmin, createFileUpload)
router.route('/upload/audio').post(verifyAdmin, fileUpload.single('file'), uploadfile)
router.route('/upload/video').post(verifyAdmin, fileUpload.single('file'), uploadfile)
router.get('/assets/:fileName', getByFileName)
module.exports = router