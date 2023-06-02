import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import {route as loginRoute} from "./router/login.js";
import {route as userRoute} from "./router/user.js";
import {route as empRoute} from "./router/emp.js";

const app = express();
app.use(cors({
   origin:'*'
}))
app.use(express.json());

app.use('/login',loginRoute)
app.use('/user',userRoute);
app.use('/emp',empRoute);


app.listen(process.env.PORT,()=>{
   console.log("Server Started!!!");
});