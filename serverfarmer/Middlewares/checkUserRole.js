/* //const mongoose = require('mongoose');
const checkUserRole = (requiredRole) => {
    return async (req, res, next) => {
      try {
        // Get the user's role from the request object
        const userRole = req.user.role;
  
        // Check if the user's role matches the required role
        if (userRole !== requiredRole) {
          return res.status(403).json({ error: "Access denied. You don't have permission to access this resource." });
        }
  
        // If the user's role matches the required role, proceed to the next middleware/route handler
        next();
      } catch (error) {
        console.error("Error checking user role:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
  };
   */