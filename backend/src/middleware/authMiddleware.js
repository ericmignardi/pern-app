import { sql } from "../lib/db.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await sql`
      SELECT * FROM users WHERE id = ${decoded.id} LIMIT 1`;

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.log("Error in protectRoute:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
