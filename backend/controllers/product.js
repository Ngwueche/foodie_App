import express from "express";
import NewProductModel from "../Model/NewProduct.js";

export const createNewProductController = async (req, res) => {
  const product = req.body;
  try {
    const saveProduct = await NewProductModel(product);
    await saveProduct.save();
    console.log(saveProduct);
    res.status(201).json({ message: "Product Saved successfully" });
  } catch (error) {
    console.error("Error saving new product:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
export const getProductController = async (req, res) => {
  const fetchData = await NewProductModel.find({});
  res.send(fetchData);
};
