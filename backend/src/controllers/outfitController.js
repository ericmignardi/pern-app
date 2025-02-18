import { sql } from "../lib/db.js";

export const read = async (req, res) => {
  const { id } = req.user;
  try {
    const outfits = await sql`
      SELECT * FROM outfits WHERE user_id = ${id}`;

    if (outfits.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }

    res.status(200).json({ success: true, data: outfits });
  } catch (error) {
    console.log("Error in read: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const readById = async (req, res) => {
  const { id } = req.user;
  const { outfitId } = req.params;
  try {
    const outfits = await sql`
      SELECT * FROM outfits WHERE user_id = ${id} AND id = ${outfitId}`;

    if (outfits.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit not found" });
    }

    res.status(200).json({ success: true, data: outfits[0] });
  } catch (error) {
    console.log("Error in readById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  const { id } = req.user;
  const { name, description } = req.body;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name field is required" });
    }

    const outfit = await sql`
      INSERT INTO outfits (user_id, name, description)
      VALUES (${id}, ${name}, ${description}) RETURNING *`;

    if (!outfit || outfit.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error creating item" });
    }

    res.status(201).json({ success: true, data: outfit[0] });
  } catch (error) {
    console.log("Error in create: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  const { id: userId } = req.user;
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name field is required" });
    }

    const outfits = await sql`
      SELECT * FROM outfits WHERE user_id = ${userId} AND id = ${id}`;

    if (outfits.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit not found" });
    }

    const updatedOutfit = await sql`
      UPDATE outfits
      SET name = ${name}, description = ${description}
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *`;

    if (!updatedOutfit || updatedOutfit.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Error updating item" });
    }

    res.status(200).json({ success: true, data: updatedOutfit[0] });
  } catch (error) {
    console.log("Error in update: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteById = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const outfitItem = await sql`
      SELECT * FROM outfits WHERE id = ${id} AND user_id = ${userId}`;

    if (outfitItem.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Outfit not found" });
    }

    await sql`
      DELETE FROM outfits WHERE id = ${id} AND user_id = ${userId}`;

    res
      .status(200)
      .json({ success: true, message: "Outfit deleted successfully" });
  } catch (error) {
    console.log("Error in deleteById: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
