import express, { Request, Response } from 'express';
import supplierRoutes from './routes/supplierRoutes';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URL;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/suppliers', supplierRoutes);



mongoose
  .connect(mongoURI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
