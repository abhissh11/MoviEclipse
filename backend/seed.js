import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { createUser, deleteAllUsers } from "./services/userService.js";
import { createMovie, deleteAllMovies } from "./services/movieService.js";

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Seeding...");

  // clear collections
  await deleteAllUsers();
  await deleteAllMovies();

  // create users
  const admin = await createUser({
    name: "Admin",
    email: "admin@example.com",
    password: "adminpass",
    role: "admin",
  });
  const user = await createUser({
    name: "John",
    email: "John@example.com",
    password: "userpass",
    role: "user",
  });

  // create movies
  await createMovie({
    title: "The Shawshank Redemption",
    description: "Classic prison drama",
    added_by: admin._id,
  });
  await createMovie({
    title: "Inception",
    description: "Mind-bending sci-fi heist",
    added_by: user._id,
  });
  await createMovie({
    title: "Spirited Away",
    description: "Magical coming-of-age anime",
    added_by: user._id,
  });

  console.log(" Seed complete. Admin: admin@example.com / adminpass");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
