import express from 'express';
import cors from 'cors';
import {route as empRoute} from './routes/emp.js'
const app = express();

// app.use((request, response, next)=>
// {
//     response.write("1111111111");
//     next();
// })
// app.use((request, response, next)=>
// {
//     response.write("222222222");
//     response.end();
//     next();
// })
app.use(cors({
    origin:'*'
    // origin: ['http://127.0.0.1:3000/emp', 'https://www.google.com/']
}))
// app.use((request, response, next)=>{
//     response.setHeader('Access-Control-Allow-Origin',"*");
//     response.setHeader('Access-Control-Allow-Headers',"*");
//     response.setHeader('Access-Control-Allow-Methods', "*")
//     next();
// })

app.use(express.json());
app.use("/emp", empRoute);

app.listen(3000, () => {
    console.log("Server Started!!");
});