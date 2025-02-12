import { sql } from "../lib/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password Must Contain At Least 6 Characters",
        });
    }

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await sql`
      INSERT INTO users (username, email, password) 
      VALUES (${username}, ${email}, ${hashedPassword}) RETURNING *`;

    // FIXED: Corrected the token generation
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    console.log("User Registered Successfully");
    res.status(201).json({
      success: true,
      data: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.log("Error in register:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    if (existingUser.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser[0].password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: existingUser[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    console.log("User Logged In Successfully");
    res.status(200).json({
      success: true,
      data: {
        id: existingUser[0].id,
        username: existingUser[0].username,
        email: existingUser[0].email,
      },
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const verify = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in verify:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
