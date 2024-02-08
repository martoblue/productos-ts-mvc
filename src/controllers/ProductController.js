const express = require('express');
const ProductService = require('../services/ProductService');

const router = express.Router();
const productService = new ProductService();

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newProductId = await productService.addProduct(req.body);
    res.status(201).send({ id: newProductId });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Producto Eliminado' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
