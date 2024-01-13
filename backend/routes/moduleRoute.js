const router = require("express").Router();
const moduleContainer= require('../controller/moduleController');
const { isAuthenticated } = require("../middleware/auth");



router.post('/voc/create-voc',moduleContainer.createVocabulary)
router.put('/voc/update-voc',moduleContainer.updateVocabulary)
router.get('/voc/get-all-voc/:id?', moduleContainer.getVocabularyList)
router.delete('/voc/delete/:id',moduleContainer.deleteVoc)

router.post('/reading/create',moduleContainer.createReading)
router.post('/reading-interactive/create',moduleContainer.createInteractiveReading)
router.put('/reading/update',moduleContainer.updateReading)
router.put('/reading/update-interactive',moduleContainer.updateInteractiveReading)
router.get('/reading/get-all/:id?',moduleContainer.getReading)
router.delete('/reading/delete/:id',moduleContainer.deleteReading)

router.post('/listening/create',moduleContainer.createListening)
router.put('/listening/update',moduleContainer.updateListening)
router.get('/listening/get-all/:id?',moduleContainer.getListening)
router.delete('/listening/delete/:id',moduleContainer.deleteListening)

router.post('/writing/create',moduleContainer.createWriting)
router.put('/writing/update',moduleContainer.updateWriting)
router.get('/writing/get-all/:id?',moduleContainer.getWriting)
router.delete('/writing/delete/:id',moduleContainer.deleteWriting)

router.post('/speaking/create',moduleContainer.createSpeaking)
router.put('/speaking/update',moduleContainer.updateSpeaking)
router.get('/speaking/get-all/:id?',moduleContainer.getSpeaking)
router.delete('/speaking/delete/:id',moduleContainer.deleteSpeaking)



module.exports= router;