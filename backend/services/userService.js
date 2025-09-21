import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ name, email, password, role = "user" }) => {
  const hash = await bcrypt.hash(password, 10);
  return User.create({ name, email, password_hash: hash, role });
};

export const deleteAllUsers = async () => {
  return User.deleteMany({});
};
