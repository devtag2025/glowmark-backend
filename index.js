import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formRoutes from "./routes/form.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/form", formRoutes);

app.get("/", (req, res) => {
  res.json("Api is running");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT`, PORT);
});
