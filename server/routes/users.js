require('../passport');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });


router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp)
router.route('/signin')
    .post(validateBody(schemas.logInSchema), passportSignIn, UsersController.login)
// router.route('/logout')
//     .get(UsersController.logout)

router.route('/oauth/google')
    .post(passportGoogle, UsersController.login)
router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.login)

router.route('/user')
    .get(passportJWT, UsersController.getUser)
    .put(passportJWT, UsersController.updateUser)

router.route('/orders')
    .get(passportJWT, UsersController.getUserOrders)
    .post(UsersController.createOrder)

module.exports = router;
