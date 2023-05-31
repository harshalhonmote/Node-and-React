import mysql from 'mysql2';

var con = mysql.createConnection({
  host: 'localhost',
  user: 'sunbeam',
  password: 'sunbeam',
  database: 'mydb'
});

export {con};
// con.query(
//     'SELECT * FROM emp limit 3',
//     function(err, results, fields) {
//       results.map((row)=>{
//         // console.log(row.ename);
//       })
//     }
//   );
// con.end()
