const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
