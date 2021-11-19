import Product from "../models/Product";

export const createProduct = async (req, res) => {
  // const { name, category, price, imgUrl } = req.body;
  const newProduct = new Product(req.body);
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const id = req.params.productId;
  const newProduct = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
  res.status(204).json();
};
