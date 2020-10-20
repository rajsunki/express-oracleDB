var express = require('express');
const oracledb = require('oracledb');
const requestModule = require('request');
const dotenv = require('dotenv');
var router = express.Router();
dotenv.config();

const dbConfig = {
  user: process.env.USER_DEV,
  password: process.env.PASSWORD_DEV,
  connectString: process.env.HOST_DEV:process.env.PORT_DEV/process.env.DB_NAME_DEV
}


 
// health route
 router.get('/ping',  async (req, res) => {
  res.status(200).json({
        status:"OK",
        ping:"pong"
   })
 
});


  router.get('/getById/:id',  async (req, res) => {

    let  empId  = req && req.params && req.params.empId ? req.params.empId  : null;

    let connection;

    try {

    connection = await oracledb.getConnection(dbConfig);

    console.log("Successfully connected to Oracle!")

    const result = await connection.execute('select * from employees where employee_id = :id',[empId])

    console.log(result.rows[0]);

  } catch (err) {
    console.log('Db Connection Err!', err)
  } finally {
    try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
  }

    res.status(200).send(result);

  });
  

module.exports = router;