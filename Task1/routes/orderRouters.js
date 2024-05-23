const express=require('express');
const orderControllers=require('../controllers/orderControllers');
const router=express.Router();



router.post('/create', orderControllers.createOrder);
router.get("/", orderControllers.getAllOrders);


module.exports={
	router,

}