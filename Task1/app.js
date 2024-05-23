const express = require('express');
const cors=require("cors");
const app = express();
const path = require('path');
const userRoutes = require('./routes/usersRoutes');
const productRoutes=require('./routes/productRoutes')
const orderRoutes=require('./routes/orderRouters');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connection
const con=require("./connection");
con.myConnection("mongodb://localhost:27017/POS1");
// Routes
app.use('/user', userRoutes.router);
app.use('/product', productRoutes.router);
app.use('/order', orderRoutes.router);
// Routes for images
app.use('/productImages', express.static(path.join(__dirname, 'productImages')));




const port = 4444;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
