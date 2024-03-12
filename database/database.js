require("dotenv").config();
const mongoose=require("mongoose");


//url
const {MONODBB_URI}=process.env;
const connectToDB =async()=>{
    try {
        var output;
        await mongoose.connect(MONODBB_URI,).then((err,db)=>{
            if(err) throw err;
            output=db;
        });
        console.log("DB Connected");
        return output;
    } catch (error) {
        console.log(error);
    }
};

connectToDB();