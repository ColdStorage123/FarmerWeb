/* module.exports = (requiredRole) => {
    return (req, res, next) => {
      const user = req.user; // Assuming you set the user in a previous middleware
  
      if (user && user.role === requiredRole) {
        next(); // User has the required role, continue to the next middleware or route
      } else {
        return res.status(403).json({ error: "Access denied. You do not have the required role." });
      }
    };
  };
   */