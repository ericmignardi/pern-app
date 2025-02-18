import { sql } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";

export const readAll = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const clothing = await sql`
      SELECT * FROM wardrobe_items WHERE user_id = ${userId}`;

    if (clothing.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Items Exist" });
    }

    res.status(200).json({ success: true, data: clothing });
  } catch (error) {
    console.log("Error in readAll: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  try {
    const clothing = await sql`
      SELECT * FROM wardrobe_items WHERE user_id = ${userId} AND id = ${id}`;

    if (clothing.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Items Exist" });
    }

    res.status(200).json({ success: true, data: clothing[0] });
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  const { name, brand, category, colour, size, material, image_url } = req.body;
  const { id: userId } = req.user;
  try {
    const response = await cloudinary.uploader.upload(image_url);
    const imageUrl = response.secure_url;

    const clothingItem = await sql`
      INSERT INTO wardrobe_items (user_id, name, brand, category, colour, size, material, image_url)
      VALUES (${userId}, ${name}, ${brand}, ${category}, ${colour}, ${size}, ${material}, ${imageUrl})
      RETURNING *`;

    if (!clothingItem) {
      return res
        .status(400)
        .json({ success: false, message: "Unable To Insert Data" });
    }

    res.status(201).json({ success: true, data: clothingItem[0] });
  } catch (error) {
    console.log("Error in create: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { name, brand, colour, size, material, image_url } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const imageUrl = image_url
      ? (await cloudinary.uploader.upload(image_url)).secure_url
      : image_url;

    const clothingItem = await sql`
      UPDATE wardrobe_items 
      SET name = ${name}, brand = ${brand}, colour = ${colour}, size = ${size}, material = ${material}, image_url = ${imageUrl} 
      WHERE id = ${id} AND user_id = ${userId} 
      RETURNING *`;

    if (clothingItem.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error Updating Item" });
    }

    res.status(200).json({ success: true, data: clothingItem[0] });
  } catch (error) {
    console.log("Error in update", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    // const imageUrl = await sql`
    //   SELECT image_url FROM wardrobe_items WHERE id = ${id} AND user_id = ${userId}`;

    // if (imageUrl.length > 0) {
    //   await cloudinary.uploader.destroy(imageUrl[0].image_url);
    // }

    const clothingItem = await sql`
      DELETE FROM wardrobe_items WHERE id = ${id} AND user_id = ${userId}`;

    res
      .status(200)
      .json({ success: true, message: "Item Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
