import express from 'express';
import {con} from '../mysql.js';
const route = express.Router();

// route.post('/carRegister',(req,resp)=>{
//     var sql = `insert into car(name,model,price,color,uid) values('${req.body.carname}','${req.body.model}','${req.body.price}','${req.body.color}','${req.body.id}')`;
//     con.query(sql,(err,result)=>{
//        if(err ==null){
//            resp.setHeader('Content-Type', 'application/json');
//           resp.send(JSON.stringify({"isSubmit":true}));
//        }
//        else{
//            resp.setHeader('Content-Type', 'application/json');
//            resp.send(JSON.stringify({"isSubmit":false}));
//        }
//     })
// });

route.get('/',(req,resp)=>{
     var sql = `select * from car`;
     con.query(sql,(err,result)=>{
        if(result.length !=0){
            resp.setHeader('Content-Type', 'application/json');
           resp.send(JSON.stringify(result));
        }
        else{
            resp.send(err);
        }
     })
});



export {route};