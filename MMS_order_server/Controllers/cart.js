const express = require('express')
const router = express.Router();
const mongoose = require('../database')
const {userModel, categoryModel, cartModel} = require('../schemas')
const ObjectId = mongoose.Types.ObjectId


// get all the products and the reqpective quantities of a user
router.get('/getCart/:user_id', async(req, res)=>{
    try{
        cartProducts = await cartModel.find({user_id: ObjectId(req.params.user_id)})
        res.json(cartProducts)
    }
    catch(e){
        res.json([])
    }
})

// increases the quantity of the product in a user's cart by one
router.post('/addCart/:user_id', async(req, res)=>{
   try{
    await cartModel.find({user_id: ObjectId(req.params.user_id), product_id: ObjectId(req.body.product_id)}).then(async(results)=>{
        a = await cartModel.updateOne({_id: results[0]._id}, {quantity: results[0].quantity + 1})
        res.json(a)
       })
   }
   catch(e){
    newCartInvoice = new cartModel({user_id: ObjectId(req.params.user_id), product_id: ObjectId(req.body.product_id), quantity: 1})
    a = await newCartInvoice.save()
    res.json(a)
   }
})

// reduces the quantity of the product in cart of a user by one
router.delete('/deleteCart/:user_id', async(req, res)=>{
    try{
        cartInvoice = await cartModel.find({user_id: ObjectId(req.params.user_id), product_id: ObjectId(req.body.product_id)})
        if (cartInvoice[0].quantity == 1){
            a = await cartModel.find({_id: ObjectId(cartInvoice[0]._id)}).deleteOne().exec();
            res.json(a)
        }
        else{
            a = await cartModel.updateOne({_id: ObjectId(cartInvoice[0]._id)}, {quantity: cartInvoice[0].quantity - 1})
            res.json(a)
        }
    }
    catch(e){
        res.json(e)
    }
})

// delete all the products in a user's cart
router.delete('/emptyCart/:user_id', async(req, res)=>{
    try{
        a = await cartModel.find({user_id: ObjectId(req.params.user_id)}).deleteMany().exec()
        res.json(a)
    }
    catch(e){
        res.json(e)
    }
})

module.exports = router