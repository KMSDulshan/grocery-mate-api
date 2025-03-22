import { Request, Response } from "express";
import Supplier from "../models/Supplier";

// Add Supplier
export const addSupplier = async (req: Request, res: Response) => {
  try {
    const { name, contactPerson, email, phone, category } = req.body;

    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier with this email already exists." });
    }

    const supplier = new Supplier({ name, contactPerson, email, phone, category });
    await supplier.save();

    res.status(201).json({ message: "Supplier added successfully", supplier });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get All Suppliers
export const getSuppliers = async (_req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
