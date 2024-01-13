const router = require("express").Router();
const commonController= require('../controller/commonController');


router.get('/:type?/:key?',commonController.createSignedURL)
router.delete('/:folder?/:key?',commonController.deleteImg)


module.exports= router;