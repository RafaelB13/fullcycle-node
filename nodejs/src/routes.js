const express = require("express");
const router = express.Router();
const db = require("./connection");


// GET /  -> List People
router.get("/", async (req, res) => {
  try {
    const users = [];
    db.query("SELECT * FROM people", (err, results, fields) => {
      if (err) {
        console.log(err);
      }
       for (const row of results) {
         users.push(row);
       }
       res.send(fetchPeople(users));
    });
   
  } catch (err) {
    res.status(500).json(err);
  }
});

// List People
function fetchPeople(users) {
  return `<div style="text-align:center;padding:50px;font-family:sans-serif;">
    <h1>Full Cycle Rocks!</h1>
    <ul style="list-style:none;margin:50px;">
    ${users
      .map(
        (user) =>
          `<li style="font-size: 2em; margin: 25px 0;">${user.id}: ${user.name} - ${user.email}</li>`
      )
      .join("")}
      </ul>
  </div>`;
}

module.exports = router;
