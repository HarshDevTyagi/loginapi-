const app=require("./app");


const {PORT}=process.env;

const startapp=()=>{
  app.listen(PORT,()=>{
    console.log('Auth Backend running on port ',`${PORT}`);
  })
};

startapp();