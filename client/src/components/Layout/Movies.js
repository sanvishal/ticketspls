import React, { Component } from "react";
import MovieCard from "../MovieCard";

import { getMovies } from "../../actions/movieActions";

import { ArrowUp, ArrowDown } from "react-feather";

class Movies extends Component {
  state = {
    movies: [],
    loading: true,
    sortby: {
      year: -1,
    },
    theatre: "A",
    sortDropdownOpen: false,
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

  setSort(attr, order) {
    let newSort = {};
    newSort[attr] = order;
    this.setState({ sortby: newSort, sortDropdownOpen: false }, () => {
      this._getMovies();
    });
  }

  render() {
    return (
      <div className="movies-container">
        <div className="top-bar">
          <div
            className={
              "dropdown sortby" +
              (this.state.sortDropdownOpen ? " is-active" : "")
            }
          >
            <div className="dropdown-trigger">
              <button
                className="button sortby"
                onClick={(e) =>
                  this.setState({
                    sortDropdownOpen: !this.state.sortDropdownOpen,
                  })
                }
              >
                <span>Sort By</span>
              </button>
            </div>

            <div class={"dropdown-menu"}>
              <div class="dropdown-content">
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("year", 1)}
                >
                  <ArrowUp />
                  Year
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("year", -1)}
                >
                  <ArrowDown />
                  Year
                </a>
                <div className="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("rating", 1)}
                >
                  <ArrowUp />
                  Rating
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("rating", -1)}
                >
                  <ArrowDown />
                  Rating
                </a>
              </div>
            </div>
          </div>

          <div className="theatre"></div>
        </div>
        <div className="movies-list">
          {!this.state.loading && this.state.movies.length ? (
            this.state.movies.map((movie, key) => {
              return (
                <div
                  className="movie-card-container fadeInLeft"
                  style={{ animationDelay: key / 20 + "s" }}
                >
                  <MovieCard
                    key={key}
                    title={movie.title}
                    duration={movie.duration}
                    rating={movie.rating}
                    year={movie.year}
                    theatres={movie.theatres}
                    genre={movie.genre}
                    summary={movie.summary}
                    actor={movie.actor}
                    director={movie.director}
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
