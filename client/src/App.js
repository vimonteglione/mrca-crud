import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { BsTrashFill } from "react-icons/bs";
import { GiPopcorn } from "react-icons/gi";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: movieReview,
    });

    setMovieList([
      ...movieList,
      { movieName: movieName, movieReview: movieReview },
    ]);
  };

  const handleKeyPress = (event, id) => {
    if (event.key === "Enter") {
      updateReview(event.target.value, id);
      console.log("Trying to update with " + event.target.value);
    }
  };

  const updateReview = (review, id) => {
    Axios.put("http://localhost:3001/api/update", {
      movieReview: review,
      movieId: id,
    });
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);

    console.log("Trying to delete movie with id " + id);
  };

  return (
    <div className="App">
      <div className="titleBox">
        <h1>
          MRCA <GiPopcorn />
        </h1>
      </div>
      <h3>Add a new review below:</h3>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          className="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        ></input>

        <label>Review:</label>
        <textarea
          type="text"
          className="movieReview"
          onChange={(e) => setMovieReview(e.target.value)}
        ></textarea>

        <button className="submitButton" onClick={submitReview}>
          Submit
        </button>

        <div className="movieList">
          {movieList.map((val) => {
            return (
              <div key={val.id} className="card">
                <h2>{capitalizeFirstLetter(val.movieName)}</h2>
                <p>{val.movieReview} </p>
                <p>
                  <button onClick={() => deleteReview(val.id)}>
                    <BsTrashFill />
                  </button>{" "}
                  <span style={{ margin: "10px" }}></span>
                  <input
                    type="text"
                    placeholder="Update"
                    onKeyDown={(e) => handleKeyPress(e, val.id)}
                  ></input>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
