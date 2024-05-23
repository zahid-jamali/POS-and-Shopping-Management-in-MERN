const md5 = require("md5");
const Users=require("../models/users");
const user = require("../models/users");

const getAllUsers=async (req, res)=>{
    const users=await Users.find();
    res.json(users);
}



const createUser = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    try {
        const user = await Users.findOne({ Email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email!" });
        } else {
            await Users.create({
                Name: name,
                Email: email,
                Phone: phone,
                Password: md5(password), // Using md5 for hashing (consider using bcrypt)
            });
            return res.status(200).json({ message: "User created successfully" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Failed to save user" });
    }
}




const updateUser = async (req, res, next) => {
    console.log(req.body);
    const { _id, name, email, phone, password } = req.body;
    try {
        const user = await Users.findById(_id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        
        if (name) user.Name = name;
        if (email) user.Email = email;
        if (phone) user.Phone = phone;
        if (password) user.Password = md5(password); 
        await user.save(); 
        res.status(200).send("User updated successfully");
    } catch (e) {
        console.error(e);
        res.status(400).send("Failed to update user");
    }
};





const authenticateUser = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ Email: email });
        if (user) {
            if (user.Password === md5(password)) {
                res.status(200).send(user);
            } else {
                res.status(401).send("Invalid password!");
            }
        } else {
            res.status(404).json("User not found!");
        }
    } catch (e) {
        res.status(400).json("Failed to authenticate user!");
        console.log(e);
    }
};




module.exports = {
    getAllUsers,
    createUser,
    authenticateUser,
    updateUser,
};
