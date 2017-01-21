var linksController = require('../links/linkController.js');
var userController = require('../users/userController.js');
var helpers = require('./helpers.js'); // our custom middleware

var isAuthenticated = function(req, res, next) {
  if ( false ) {

  } else {
    res.redirect('/');
  }
};

module.exports = function (app, express) {
  app.get('/', isAuthenticated);
  app.get('/:code', linksController.navToLink);

  // app.get('/test/:id/:username', function (req, res) {
  //   console.log('This should be our id:', req.params.id);
  //   console.log('This should be our username:', req.params.username);
  // });

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  // authentication middleware used to decode token and made available on the request
  app.use('/api/links', helpers.decode);
  app.get('/api/links/', isAuthenticated, linksController.allLinks);
  app.post('/api/links/', isAuthenticated, linksController.newLink);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

// '$route.routes['/links'].controller'