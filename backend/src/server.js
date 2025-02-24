import express from "express";
import cors from "cors";
import { sql } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import clothingRoutes from "./routes/clothingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
import outfitItemRoutes from "./routes/outfitItemRoutes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/clothing", clothingRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/outfitItem", outfitItemRoutes);
app.use("/api/wishlist", wishlistRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profile_pic TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`
      CREATE TABLE IF NOT EXISTS wardrobe_items (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      brand VARCHAR(50),
      category VARCHAR(50),
      colour VARCHAR(50),
      size VARCHAR(20),
      material VARCHAR(100),
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      brand VARCHAR(50),
      colour VARCHAR(50),
      size VARCHAR(20),
      price DECIMAL(10,2),
      image_url TEXT,
      link TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`
      CREATE TABLE IF NOT EXISTS outfits (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`
      CREATE TABLE IF NOT EXISTS outfit_items (
      id SERIAL PRIMARY KEY,
      outfit_id INT REFERENCES outfits(id) ON DELETE CASCADE,
      wardrobe_item_id INT REFERENCES wardrobe_items(id) ON DELETE CASCADE)`;
    console.log("Database Initialized Successfully");
  } catch (error) {
    console.log("Error in initDB: ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
