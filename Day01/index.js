//import { sub, add } from "./myDemo.js";
// console.log(add());
// console.log(sub());

import http from "http";
import {con} from './mysql.js'

http.createServer((req, resp) => {
   resp.setHeader("Content-Type", "text/html");
    resp.write(`<h1>Hello Node!!</h1>`);
    resp.end();
}).listen(3000, () => {
    console.log("Server Started!!");
});

//------------express------------------
// import express from 'express';
// var app = express();
// app.get('/', function (req, res) {
//     res.send('<b>My</b> first express http server');
// });
// app.listen(3000, () => {
//     console.log("Server Started!!");
// });
