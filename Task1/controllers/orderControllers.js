const Order = require("../models/order");
const user=require('../models/users')
const Product=require("../models/product")
const createOrder = async (req, res) => {
    try {
        const { cart, totalPrice, billingInfo, userId } = req.body;

         await cart.map(async (prd)=>{
            const item= await Product.findOne({_id:prd._id})
            item.stock=item.stock-prd.quantity;
            item.save();
            
        }) 
         // console.log(cart);

        const order = new Order({
            user: userId, 
            items: cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.newPrice,
            })),
            totalPrice,
            billingInfo,
        });
        const savedOrder = await order.save();

        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Order creation failed", error });
        console.log(error);
    }
};



const getAllOrders= async (req, res) => {
    try {
        const orders = await Order.find().populate({path:'user', model:'users'}).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports={
    createOrder,
    getAllOrders,
}

