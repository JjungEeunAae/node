const pool = require("./pool");

sql = "SELECT * FROM customers";
pool.query(sql, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});
