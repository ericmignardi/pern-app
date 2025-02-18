import { sql } from "../lib/db.js";

export const read = async (req, res) => {
  try {
    const outfitItems = await sql`
      SELECT * FROM outfit_items`;

    if (outfitItems.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No outfit items found" });
    }

    res.status(200).json({ success: true, data: outfitItems });
  } catch (error) {
    console.log("Error in read: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id } = req.params;
  try {
    const outfitItems = await sql`
      SELECT * FROM outfit_items WHERE id = ${id}`;

    if (outfitItems.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit item not found" });
    }

    res.status(200).json({ success: true, data: outfitItems[0] });
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  const { outfit_id, wardrobe_item_id } = req.body;

  if (!outfit_id || !wardrobe_item_id) {
    return res.status(400).json({
      success: false,
      message: "outfit_id and wardrobe_item_id are required",
    });
  }

  try {
    const outfitItem = await sql`
      INSERT INTO outfit_items (outfit_id, wardrobe_item_id)
      VALUES (${outfit_id}, ${wardrobe_item_id}) RETURNING *`;

    if (outfitItem.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error creating the outfit item" });
    }

    res.status(201).json({
      success: true,
      data: outfitItem[0],
    });
  } catch (error) {
    console.log("Error in create: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { outfit_id, wardrobe_item_id } = req.body;
  const { id } = req.params;

  if (!outfit_id || !wardrobe_item_id) {
    return res.status(400).json({
      success: false,
      message: "outfit_id and wardrobe_item_id are required",
    });
  }

  try {
    const outfitItems = await sql`
      SELECT * FROM outfit_items WHERE id = ${id}`;

    if (outfitItems.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit item not found" });
    }

    const updatedOutfitItem = await sql`
      UPDATE outfit_items
      SET outfit_id = ${outfit_id}, wardrobe_item_id = ${wardrobe_item_id}
      WHERE id = ${id} RETURNING *`;

    if (updatedOutfitItem.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error updating the outfit item" });
    }

    res.status(200).json({
      success: true,
      data: updatedOutfitItem[0],
    });
  } catch (error) {
    console.log("Error in update: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const outfitItem = await sql`
      SELECT * FROM outfit_items WHERE id = ${id}`;

    if (outfitItem.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit item not found" });
    }

    await sql`
      DELETE FROM outfit_items WHERE id = ${id}`;

    res.status(200).json({
      success: true,
      message: `Outfit item with ID ${id} deleted successfully`, // Return ID of deleted item for clarity
    });
  } catch (error) {
    console.log("Error in delete: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
