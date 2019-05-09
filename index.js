const {Client} = require('pg')
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "Tara",
  port: 5432,
  database: "makersbnb"
})

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query("select * from users"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
