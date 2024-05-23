const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    billingInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
