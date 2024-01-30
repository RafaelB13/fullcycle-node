const mysql = require("mysql2");
require("dotenv").config();

// DB Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Check if the connection is established
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Query People Table
const createTable = `CREATE TABLE IF NOT EXISTS people (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL);`;
connection.query(createTable, (err, results, fields) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table People created successfully!");
  }
});

const people = [
  "John Lennon",
  "Paul McCartney",
  "George Harrison",
  "Ringo Starr",
];

// Populate people table
for (const p of people) {
  const query = `INSERT INTO people (name, email) VALUES ('${p}', '${p.slice(0, p.indexOf(" ")).toLowerCase()}@beatles.com')`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error creating people:", err);
    }
    console.log(query);
  });
}

module.exports = connection;
