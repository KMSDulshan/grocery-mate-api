import express,{ Request, Response }  from "express";

import { addSupplier, getSuppliers } from "../controllers/supplierController";
import Supplier from "../models/Supplier";

const router = express.Router();

// Correctly handling async routes with `.then().catch()`
router.post("/", async (req: Request, res: Response) => {  
  try {
    const { name, contactPerson, email, phone, category } = req.body;

    if (!name || !email || !phone || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSupplier = new Supplier({ name, contactPerson, email, phone, category });
    await newSupplier.save();

    res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
router.get("/", async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
