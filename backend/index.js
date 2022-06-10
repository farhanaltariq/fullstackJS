'use strict';
import express from "express";
import db from "./config/database.js";
import productRoutes from "./routes/index.js";
import cors from "cors";

const app = express();

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(cors());
app.use(express.json());
app.use('/product', productRoutes);

const host = "localhost";
const port = 5000;
app.listen(port, () =>
  console.log(`App listening on http://${host}:${port} !`)
);
