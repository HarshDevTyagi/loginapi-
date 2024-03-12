const express=require("express");
const router=express.Router();
const {createNewuser, createNewmsg, reaction_atcontroller, seen_atcontroller}=require("./controller_chat_channel");

//const controller_chat_channel=require("./controller_chat_channel");


router.post ("/seen_at",async(req,res)=>{
    try {
        var seen_byuser={
            "message":req.body.message,
            "seen_user":req.body.seen_user,
            };
            console.log(seen_byuser);
           
            const newUser=await seen_atcontroller({
                seen_byuser,
            });
            res.status(200).json({
                status:1,
                msg:newUser,
                rescode:200});
        
    } 
    catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})

router.post ("/reaction_at",async(req,res)=>{
    try {
        var userreaction={
            "message":req.body.message,
            "reaction": req.body.reaction,
            "by":req.body.by
            };
            console.log("user",userreaction);

            const newUser=await reaction_atcontroller({
                userreaction,
            });
            res.status(200).json({
                status:1,
                msg:newUser,
                rescode:200});
        
    } 
    catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})


router.post("/userchat",async(req,res)=>{
    try {
        var user={
            "Name": req.body.Name,
            "Email":req.body.Email,
            "profilepic":req.body.profilepic,
        };
        
        console.log( user.Email + "routes ");

               const newUser=await createNewuser({
                user,
           //     console.log;
               });
               res.status(200).json({
                 status:1,
                 msg:newUser,
                 rescode:200});
        

    } catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})





router.post("/msg",async(req,res)=>{
    try {
        let{message}=req.body;
       message=message.trim();

        if(!(message))
        {
            throw Error("Empty input fields!");
        } 
        
       
          const newUser=await createNewmsg({
           message,
          });
          res.status(200).json({
            status:1,
            msg:newUser,
            rescode:200});
        
        

    } catch (error) {
        res.status(400).json({
            status:0,
            msg:error.message,
            rescode:400});
        

        
    }
});
module.exports=router;