const errorHandler = require("../utils/errorHandler");

function authorize(allowedRoles) {
  return (req, res, next) => {
    if (req.user.role == role) {
        return errorHandler(res, "Forbidden", 403, "Tidak Ada Akses");
    }


    if (!allowedRoles.includes(userRole)) {
      return errorHandler(res, 403, "Access denied");
    }

    next();
  };
}

module.exports = authorize;

