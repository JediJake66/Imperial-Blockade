import { createConnection } from 'mysql'

var connection = createConnection({
    host:"localhost",
    user:"root",
    password:"Sheena4ever!",
    database : "bench_tables"
})
  
// Connecting to database
connection.connect(function(err) {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
    else{
      console.log(`Database Connected`)
      connection.query(`SHOW DATABASES`, 
      function (err, result) {
        if(err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ",result) 
      })
    }
})
