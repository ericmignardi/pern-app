import express from "express";
import cors from "cors";
import { sql } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

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
      CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL)`;
    await sql`
      CREATE TABLE IF NOT EXISTS wardrobe_items (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      category_id INT REFERENCES categories(id) ON DELETE SET NULL,
      name VARCHAR(100) NOT NULL,
      brand VARCHAR(50),
      color VARCHAR(50),
      size VARCHAR(20),
      material VARCHAR(100),
      image_url TEXT,
      purchase_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      brand VARCHAR(50),
      color VARCHAR(50),
      size VARCHAR(20),
      material VARCHAR(100),
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
