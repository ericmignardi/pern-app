import { sql } from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";

export const read = async (req, res) => {
  const { id } = req.user;
  try {
    const wishlist = await sql`
      SELECT * FROM wishlist WHERE user_id = ${id}`;

    if (wishlist.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }

    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.log("Error in read: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id } = req.user;
  const { id: wardrobeId } = req.params;
  try {
    const wishlist = await sql`
      SELECT * FROM wishlist WHERE user_id = ${id} AND id = ${wardrobeId}`;

    if (wishlist.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in your wishlist" });
    }

    res.status(200).json({ success: true, data: wishlist[0] });
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  const { id } = req.user;
  const { name, brand, colour, size, price, image_url, link } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name Field Is Required" });
    }

    let uploadedImageUrl = image_url;
    if (uploadedImageUrl) {
      const response = await cloudinary.uploader.upload(uploadedImageUrl);
      uploadedImageUrl = response.secure_url;
    }

    const wishlist = await sql`
      INSERT INTO wishlist (user_id, name, brand, colour, size, price, image_url, link)
      VALUES (${id}, ${name}, ${brand}, ${colour}, ${size}, ${price}, ${uploadedImageUrl}, ${link})
      RETURNING *`;

    res.status(201).json({ success: true, data: wishlist[0] });
  } catch (error) {
    console.log("Error in create: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { name, brand, colour, size, price, image_url, link } = req.body;

  try {
    let uploadedImageUrl = image_url;
    if (uploadedImageUrl) {
      const response = await cloudinary.uploader.upload(uploadedImageUrl);
      uploadedImageUrl = response.secure_url;
    }

    const wishlistItem = await sql`
      SELECT * FROM wishlist WHERE user_id = ${userId} AND id = ${id}`;

    if (wishlistItem.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const updatedWishlist = await sql`
      UPDATE wishlist
      SET name = ${name}, brand = ${brand}, colour = ${colour}, size = ${size}, price = ${price}, image_url = ${uploadedImageUrl}, link = ${link}
      WHERE user_id = ${userId} AND id = ${id}
      RETURNING *`;

    res.status(200).json({ success: true, data: updatedWishlist[0] });
  } catch (error) {
    console.log("Error in update: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const wishlistItem = await sql`
      SELECT * FROM wishlist WHERE id = ${id} AND user_id = ${userId}`;

    if (wishlistItem.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Optional: Uncomment this to delete the image from Cloudinary when deleting the item
    // const imageUrl = wishlistItem[0].image_url;
    // if (imageUrl) {
    //   await cloudinary.uploader.destroy(imageUrl);
    // }

    await sql`
      DELETE FROM wishlist WHERE id = ${id} AND user_id = ${userId}`;

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error in deleteById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
