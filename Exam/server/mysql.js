import mysql from 'mysql2';

const con = mysql.createConnection({
    host: process.env.HOST ,
    user: process.env.USER ,
    password: process.env.PASS ,
    database: process.env.DB 
 });

 export {con};