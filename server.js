const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port = process.env.PORT || 4000;
const HomeRoutes=require('./Routes/HomeRoute');
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs');
app.set('views','views');
app.use(HomeRoutes);
app.listen(port,()=>{
    console.log(`Server is connected to port ${port}`);
})