// /api/user/favorite.js

import { connectToDb } from "../../utils/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  const { countryCode } = req.body;

  if (!countryCode)
    return res.status(400).json({ error: "Country code required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await connectToDb();
    const users = db.collection("users");

    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isFavorite = user.favorites?.includes(countryCode);

    const update = isFavorite
      ? { $pull: { favorites: countryCode } }
      : { $addToSet: { favorites: countryCode } };

    await users.updateOne({ _id: user._id }, update);

    res.status(200).json({ success: true, loved: !isFavorite });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
