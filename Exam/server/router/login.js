import express from 'express';
import mysql from 'mysql2';
const route = express.Router();

const con = mysql.createConnection({
   host: process.env.HOST ,
   user: process.env.USER ,
   password: process.env.PASS ,
   database: process.env.DB 
});

route.post('/register',(req,resp)=>{
    var sql = `insert into user(email,pass,role) values('${req.body.email}','${req.body.pass}','usr')`;
    con.query(sql,(err,result)=>{
       if(err ==null){
           resp.setHeader('Content-Type', 'application/json');
          resp.send(JSON.stringify(result));
       }
       else{
           resp.setHeader('Content-Type', 'application/json');
           resp.send(JSON.stringify(err));
       }
    })
});

route.post('/',(req,resp)=>{
     var sql = `select * from user where email='${req.body.email}' and pass='${req.body.pass}'`;
     con.query(sql,(err,result)=>{
        if(result.length !=0){
            resp.setHeader('Content-Type', 'application/json');
           resp.send(JSON.stringify(result));
        }
        else{
            resp.setHeader('Content-Type', 'application/json');
            resp.send(err);
        }
     })
});



export {route};