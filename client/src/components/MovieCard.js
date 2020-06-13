import React, { Component } from "react";

function MovieCard({ title, duration, rating, theatre, year, summary, genre }) {
  return (
    <div className="movie-card">
      <div className="movie-title">{title + "(" + year + ")"}</div>
    </div>
  );
}

export default MovieCard;
