import express from "express";
import mysql from 'mysql2';
import atob from 'atob';

const route = express.Router();
const con = mysql.createConnection({
    host: 'localhost',
    user: 'sunbeam',
    password: 'sunbeam',
    database: 'mydb'
});
//----------LogIn-------------------
route.post('/login',(req,resp)=>{
  //resp.send("login "+req.body.email);
  var pass = atob(req.body.pass);
  var sql = `select * from emp where ename='${req.body.email}' and city='${pass}'`;
   con.query(sql,(err, results)=> {
   // console.log(results.length !=0);
      if(results.length !=0 )
      {
          var data = {"isValid":true};
          resp.setHeader("Content-Type","application/json");
         resp.send(JSON.stringify(data));
      } 
      else
      {
        var data = {"isValid":false};
        resp.setHeader("Content-Type","application/json");
       resp.send(JSON.stringify(data));
      }
      resp.end();
   
   });
})

//------------------------------------------------
route.get('/',(req,resp)=>{
    // resp.send("Get emp called");

   var sql = 'select * from emp';
    con.query(sql,(err, results)=> {
       if(err==null){
         var data = JSON.stringify(results);
         resp.send(data);
       }
       else{
        resp.send(err);
       }
    });
})
route.post('/',(req,resp)=>{
    // resp.send("Get emp called "+req.body.ename);
    var sql = `insert into emp(ename,city) values('${req.body.ename}','${req.body.city}')`;
     con.query(sql,(err, results)=> {
        if(err==null)
        {
            var data = JSON.stringify(results) 
            resp.setHeader("Content-Type","application/json");
           resp.send("success");
        } 
        else
        {
            //console.log(err);
            resp.setHeader("Content-Type","application/json");
            resp.send("err");
        }
        resp.end();
     
     });
 })
//-----------------------------------------------------
 route.put('/:id',(req,resp)=>{
    // resp.send("Get emp called");
    var sql = `update emp set ename='${req.body.ename}',city='${req.body.city}' where id=${req.params.id}`;
     con.query(sql,(err, results)=> {
        if(err==null){
          var data = JSON.stringify(results);
          resp.setHeader("Content-Type","application/json");
          resp.send(data);
        }
        else{
            resp.setHeader("Content-Type","application/json");
         resp.send(err);
        }
        resp.end();
     });
 })
 route.delete('/:id',(req,resp)=>{
    // resp.send("Get emp called");
    var sql = `delete from emp where id=${req.params.id}`;
     con.query(sql,(err, results)=> {
        if(err==null){
          var data = JSON.stringify(results);
          resp.setHeader("Content-Type","application/json");
          resp.send(data);
        }
        else{
            resp.setHeader("Content-Type","application/json");
         resp.send(err);
        }
     });
 })
export { route };