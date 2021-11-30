const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');


/* Get All Products */
router.get('/', (req, res) => {

  database.table('products')
    // .withFields(['title', 'description', 'price'])  // in order to get specified fields in the select
    // .filter({ id: 2 })  // add where clause in the query
    // .slice(startValue, endValue)  // in order to add offset and limit
    .sort({ id: 1 })  // -1
    .getAll()
    // .get()  // in order to get single record
    .then(prods => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length,
          products: prods,
          success: true
        });
      } else {
        res.json({ message: 'No products found', success: false });
      }
    }).catch(err => console.log(err));

});

/* Get Single Product */
router.get('/:prodId', (req, res) => {
  let productId = req.params.prodId;

  database.table('products')
    .filter({ id: productId })
    .get()
    .then(prod => {
      if (prod) {
        res.status(200).json({ ...prod, success: true });
      } else {
        res.json({ message: `No product found with Product ID: ${productId}`, success: false });
      }
    }).catch(err => console.log(err));
});

/* Insert a New Product */
router.post('/', (req, res) => {
  let { title, description, price, quantity } = req.body;
  database.table('products')
    .insert({
      title,
      description,
      price,
      quantity
    }).then(newId => {
      if (newId.insertId > 0) {
        res.status(200).json({ message: 'New Product has been added successfully', success: true })
      } else {
        res.json({ message: 'Unable to add new product', success: false });
      }
    }).catch(err => console.log(err));
});

/* Update Product */
router.put('/:prodId', (req, res) => {

  let productId = req.params.prodId;
  let { title, description, price, quantity } = req.body;

  database.table('products')
    .filter({ id: productId })
    .update({
      title,
      description,
      price,
      quantity
    }).then(result => {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Product has been updated successfully', success: true });
      } else {
        res.json({ message: 'Unable to update product', success: false });
      }
    }).catch(err => console.log(err));
});

/* Delete a Product */
router.delete('/:prodId', (req, res) => {
  let productId = req.params.prodId;

  database.table('products')
    .filter({ id: productId })
    .remove()
    .then(result => {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Product has been deleted successfully', success: true });
      } else {
        res.json({ message: 'Unable to delete product', success: false });
      }
    });
});

module.exports = router;