const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});


const updateStatus = () => {
  return new Promise(function(resolve, reject) {
    pool.query('Update alert set status="CLOSED" where id=1', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The alert was modified!`);
    })
  }) 
}

module.exports = {
  updateStatus,
}