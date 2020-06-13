import React, { Component } from "react";
import { Clock, Star } from "react-feather";

function MovieCard({
  title,
  duration,
  theatre,
  year,
  summary,
  genre,
  rating,
  director,
  actor,
}) {
  return (
    <div className="movie-card">
      <div className="movie-title">{title + " (" + year + ")"}</div>
      <div className="metadata">
        <div className="rating">
          <Star />
          {rating}
        </div>
        <div className="duration">
          <Clock /> {duration + " mins"}
        </div>
      </div>

      <div className="genre">{genre}</div>
      <div className="summary">{summary}</div>
      <div className="persons">{director + " • " + actor}</div>
    </div>
  );
}

export default MovieCard;
