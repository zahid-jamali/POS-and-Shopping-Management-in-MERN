const Product = require('../models/product');
const User = require('../models/users');

const createProduct = async (req, res) => {
    console.log(req.body);
    const { title, description, stock, oldPrice, newPrice, userId } = req.body;
    console.log(userId, title, stock);
    console.log(req.file)
    const productImage = req.file.path;

    try {
        const user = await User.findOne({_id:userId});
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const product = new Product({title: title, description: description, stock:stock, oldPrice: oldPrice, newPrice: newPrice, productImage: productImage, user: userId});

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error });
    }
};



const updateProduct=async (req, res)=>{

    const {product, quantity}=req.body
    console.log(req.body);
    try {
        const prd=await Product.findById(product);
        prd.stock=quantity;
        await prd.save();
        res.status(200).json({message:"Product updated successfully!"})
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error });
    }
}





module.exports = {
    createProduct,
    getProducts,
    updateProduct,
};
