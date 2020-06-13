import React, { Component } from "react";
import MovieCard from "../MovieCard";

import { getMovies } from "../../actions/movieActions";

class Movies extends Component {
  state = {
    movies: [],
    loading: true,
    sortby: {
      year: -1,
    },
    theatre: "A",
  };

  _getMovies = async () => {
    await getMovies(
      {
        sortby: this.state.sortby,
        theatre: this.state.theatre,
      },
      (result) => {
        console.log(result);
        if (result.status === "success") {
          this.setState({ movies: result.message, loading: false });
        }
      }
    );
  };

  componentDidMount() {
    this._getMovies();
  }

  render() {
    return (
      <div className="movies-container">
        <div className="movies-list">
          {!this.state.loading && this.state.movies.length ? (
            this.state.movies.map((movie) => {
              return (
                <div className="movie-card-container">
                  <MovieCard
                    title={movie.title}
                    duration={movie.duration}
                    rating={movie.rating}
                    year={movie.year}
                    theatres={movie.theatres}
                    genre={movie.genre}
                    summary={movie.summary}
                  />
                </div>
              );
            })
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
