const mong=require("mongoose");

const myConnection=(url)=>{
    // mongo=mongoose();
    return mong.connect(url).then(console.log("Database Connected!"));
};

module.exports={myConnection};
