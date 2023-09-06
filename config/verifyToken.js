const jwt = require("jsonwebtoken");

module.exports.getToken = function(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token =  req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, 'mySecret');
      return decodedToken; 

    } 
    return null;
  }