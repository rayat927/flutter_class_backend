const mysql = require('mysql')


const pool = mysql.createConnection({
    host: '${process.env.host}',
    user: '${process.env.user}',
    password: '${process.env.password}',
    database: '${process.env.db}'
})

pool.connect(err => {
    if(err){
        console.log(
            "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
          );
    }else{
      console.log('DB connection succeeded');  
    }
    
})

// con = pool.promise()

module.exports = pool
