const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//schema for the user deatail 

// const UserSchema=new Schema({
//     name:String,
//     email:{ type: String,unique:true},
//    profilepic:String
// });

//schema for the msg 
const UserSchemaformsg=new Schema({
    message:{
        type:String,
        $exists: true},
       
  
  
   
});

/// reraction at seen schema 

const seen_at = new Schema({
    seen: String,
    seen_by:String,
   
});
const seen = new Schema({
    message:String,
   seen_user: [seen_at],
    // Array of userSchema
});
const seen_atmodel = mongoose.model('seen', seen,"usermsgs");









// reaction_at model schema




const newreaction_at = new Schema({
    reaction_emoji: String,
    reacted_by:String,
    reacted_at: String
});
const reactionlistschema = new Schema({
    message:String,
   reaction: [newreaction_at],
   by:String
    // Array of userSchema
});
const reacted_atmodel = mongoose.model('reaction', reactionlistschema,"usermsgs");



//const User=mongoose.model("User",UserSchema);
const usermsgmodel=mongoose.model("msg",UserSchemaformsg,"usermsgs");

const newuserSchema = new Schema({
    Name: String,
    Email: String,
    profilepic: String
});


const userlistschema = new Schema({
    users: [newuserSchema] // Array of userSchema
});



const userdetailmodel = mongoose.model('userdetail', userlistschema,"usermsgs");

module.exports={usermsgmodel,userdetailmodel,reacted_atmodel,seen_atmodel};