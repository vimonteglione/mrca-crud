const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "system",
  database: "cruddb",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) values (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const movieId = req.params.id;

  const sqlDelete = "DELETE FROM movie_reviews WHERE id=?";
  db.query(sqlDelete, movieId, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const movieReview = req.body.movieReview;
  const movieId = req.body.movieId;

  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id=?";
  db.query(sqlUpdate, [movieReview, movieId], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
