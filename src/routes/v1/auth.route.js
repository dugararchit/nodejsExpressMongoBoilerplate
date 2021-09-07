/**
 * Created By: Archit
 * Authentication Route
 */
const router = require('express').Router();

const authController = require('../../controller/authController');

const { loginUser, signupUser, refreshToken } = authController;

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/refreshToken', refreshToken);

module.exports = router;
