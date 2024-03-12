const { json } = require("express");
const {usermsgmodel,userdetailmodel, reacted_atmodel, seen_atmodel} = require("./model");
//const user = require("./model");



// const Document=async(data)=>{
//     try {
//         const {Name,Email,profilepic,}=data;

//         const deatail={
//             Name,
//             Email,
//             profilepic,
//         };
//         console.log("controller  "+Email,Name,profilepic);

//         const createdUser=await insertOne(deatail);
//         return createdUser;
//     } catch (error) {
//         res.status(400) .json({
//             status:0,
//             msg:error.message,
//             rescode:400

//                 }); 
//     }
// }

const createNewmsg= async(data)=>{
    try {
        const {message}=data ;
       
        
        const newUser= new usermsgmodel({
            message,
        });

    
        const createdUser=await newUser.save();
        return createdUser;

        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
        
    }
};



const seen_atcontroller = async (data) => {
    try {
        const  {seen_byuser}  = data;
      //  console.log("controller"+data.seen_byuser.seen_user);
       console.log("harsh"+JSON.stringify(seen_byuser.seen_user));
        
        var updateddocument = " ";
        await seen_atmodel.findOneAndUpdate(
            { message: seen_byuser.message }, 
            { $push: { seen_user: seen_byuser.seen_user} },
            { new: true }
        ).then((userpushed) => {
            updateddocument = userpushed;
        });
      //  console.log("updated"+updateddocument);
       
    
        return updateddocument;
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message,
            rescode: 400
        });
    }
};

const reaction_atcontroller = async (data) => {
    try {
        const  {userreaction}  = data;
        //const value = data.message; // Accessing the message property
        console.log("data"+ data.userreaction.message); // Logging the message property
        var updateddocument = " ";
        await reacted_atmodel.findOneAndUpdate(
            { message: userreaction.message }, 
            { $push: { reaction: userreaction.reaction } },
            { new: true }
        ).then((userpushed) => {
            updateddocument = userpushed;
        });
        console.log(updateddocument);
    
        return updateddocument;
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message,
            rescode: 400
        });
    }
};



// const rection_atcontroller = async (data) => {
//     const { reactionstore } = data;
//     var reaction_controller = "";
//     try {
//         const existingRecord = await reacted_atmodel.findOne({ message: reactionstore.message });

//         // if (!existingRecord) {
//         //     const newRecord = new reacted_atmodel({
//         //         message: reactionstore.message,
//         //         users: [reactionstore]
//         //     });
//         //     reaction_controller = await newRecord.save();
      
//             existingRecord.users.push(reactionstore);
//             reaction_controller = await existingRecord.save();
        

//         return reaction_controller;
//     } catch (error) {
//         console.error("Error in reaction_atcontroller:", error);
//         throw error;
//     }
// }

const createNewuser= async(data)=>{
    try {
        const {user}=data ;
        var createdUser="";
        console.log(user.Email+"controller");

     await userdetailmodel.findOne({ users: { $ne: null } }, ).then(async(check)=>{
            console.log(check);
            if(check == null){
                const newUser= new userdetailmodel({
                    users : [
                        user
                    ],
                });
                createdUser=await newUser.save();
            }
            else{
                console.log("else worked");
                await userdetailmodel.findOneAndUpdate(
                    { _id: check._id }, // Filter for the user you want to update
                    { $push: { users: user } }, // Use $push to add the new message to the array
                    { new: true }, // Option to return the updated document
                ).then((userpushed)=>{
                    console.log("else then worked "+ userpushed._id);
                    createdUser = userpushed;
                });
                console.log("else ended");
            }
        });
        console.log("returned from controller worked");
        return createdUser;

        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
        
    }
};
module.exports={createNewmsg,createNewuser,reaction_atcontroller,seen_atcontroller};