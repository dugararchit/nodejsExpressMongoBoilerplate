const bcrypt = require('bcryptjs');
const UserModel = require('../model/user');
const utilities = require('../utils/utils');
const logger = require('../config/logger');

const refreshToken = async (req, res) => {
  try {
    logger.info(`Refreshing token started!`);
    utilities.refreshToken(req, res);
  } catch (err) {
    logger.error('Error Occurred @ refreshToken:', err);
  }
};

const loginUser = async (req, res) => {
  try {
    logger.info('Request Initiated @ Login function\n');

    const { email, password } = req.body;
    logger.info(`Email: ${email} & Password: ${password}\n`);

    // check whether is already exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send({ message: 'User not exist!' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logger.info('Incorrect password', password, user.password);
      return res.status(400).send({ message: 'Incorrect password!' });
    }

    // jwt key generation
    const { accessToken, tokenRefresh } = await utilities.generateToken({
      _id: user._id,
    });
    logger.info(`accessToken => ${accessToken} \nrefreshToken => ${refreshToken}\n`);

    return res.status(201).json({ accessToken, tokenRefresh });
  } catch (e) {
    logger.info('Error caught @ loginUser controller: ', e);
  }
};

const signupUser = async (req, res) => {
  logger.info(`Entered in Sign up user`);

  // Check weather user is already registered
  const userExist = await UserModel.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send('User already exist!');

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  logger.info(hashedPassword);

  const newUser = new UserModel({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(200).send({
      id: savedUser._id,
      message: 'New user added successfully!',
    });
  } catch (err) {
    logger.error('Errored occured', err);
    return res.status(400).send({ error: 'LOL' });
  }
};

module.exports = { refreshToken, loginUser, signupUser };
