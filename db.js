const mysql = require('mysql')


const pool = mysql.createConnection({
    host: '68.178.163.174',
    user: 'root',
    password: 'Fizar#123',
    database: 'flutter_class'
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