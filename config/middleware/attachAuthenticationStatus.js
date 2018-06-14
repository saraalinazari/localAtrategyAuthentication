function attachAuthenticationStatus(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  };
  
  module.exports = attachAuthenticationStatus;