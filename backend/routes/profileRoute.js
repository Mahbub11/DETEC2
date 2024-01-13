const router = require("express").Router();
const profileController= require('../controller/profileController');
const { isAuthenticated } = require("../middleware/auth");


router.post('/save-word',isAuthenticated,profileController.saveWord)
router.get('/get-word-list',isAuthenticated,profileController.getWordList)
router.post('/save-bookmark',isAuthenticated,profileController.saveBookmark)
// router.delete('/delete-bookmark/:type/:inner_type/:qNo',isAuthenticated,profileController.deleteBookmark)
router.get('/get-bookmark',isAuthenticated,profileController.getBookmarks)
router.delete('/delete-word/:flag/:data',isAuthenticated,profileController.deleteWord)
router.post('/save-stat-duolingo',profileController.saveStatisticDuolingo)
router.post('/save-profile-info',profileController.saveProfileInfo)
router.get('/get-profile-info',isAuthenticated,profileController.getProfileInfo)
router.get('/get-statd',isAuthenticated,profileController.getStatDuolingo)

module.exports= router;