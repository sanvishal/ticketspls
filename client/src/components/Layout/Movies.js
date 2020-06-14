import React, { Component } from "react";
import MovieCard from "../MovieCard";
import { history } from "react-router-dom";

import { getMovies } from "../../actions/movieActions";
import { connect } from "react-redux";
import { selectShow } from "../../actions/movieActions";

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
    theatreDropdownOpen: false,
    dateDropdownOpen: false,
    date: "Today",
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
      this.setState({ loading: true });
      this._getMovies();
    });
  }

  setTheater(theatre) {
    this.setState({ theatre, theatreDropdownOpen: false }, () => {
      this.setState({ loading: true });
      this._getMovies();
    });
  }

  setDate(date) {
    this.setState({ date, dateDropdownOpen: false });
  }

  _selectShow(movie, date, time, theatre) {
    this.props.selectShow(movie, date, time, theatre);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.movies.selected_movie !== this.props.movies.selected_movie ||
      prevProps.movies.selected_date !== this.props.movies.selected_date ||
      prevProps.movies.selected_time !== this.props.movies.selected_time
    ) {
      this.props.history.push("/seats");
    }
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
                  <ArrowDown />
                  Year
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("year", -1)}
                >
                  <ArrowUp />
                  Year
                </a>
                <div className="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("rating", 1)}
                >
                  <ArrowDown />
                  Rating
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setSort("rating", -1)}
                >
                  <ArrowUp />
                  Rating
                </a>
              </div>
            </div>
          </div>

          <div
            className={
              "dropdown theater" +
              (this.state.theatreDropdownOpen ? " is-active" : "")
            }
          >
            <div className="dropdown-trigger">
              <button
                className="button theater"
                onClick={(e) =>
                  this.setState({
                    theatreDropdownOpen: !this.state.theatreDropdownOpen,
                  })
                }
              >
                <span>{"Theatre " + this.state.theatre}</span>
              </button>
            </div>

            <div class={"dropdown-menu"}>
              <div class="dropdown-content">
                <a class="dropdown-item" onClick={(e) => this.setTheater("A")}>
                  Theater A
                </a>
                <a class="dropdown-item" onClick={(e) => this.setTheater("B")}>
                  Theater B
                </a>
                <a class="dropdown-item" onClick={(e) => this.setTheater("C")}>
                  Theater C
                </a>
                <a class="dropdown-item" onClick={(e) => this.setTheater("D")}>
                  Theater D
                </a>
                <a class="dropdown-item" onClick={(e) => this.setTheater("E")}>
                  Theater E
                </a>
              </div>
            </div>
          </div>
          <div
            className={
              "dropdown date" +
              (this.state.dateDropdownOpen ? " is-active" : "")
            }
          >
            <div className="dropdown-trigger">
              <button
                className="button date"
                onClick={(e) =>
                  this.setState({
                    dateDropdownOpen: !this.state.dateDropdownOpen,
                  })
                }
              >
                <span>{this.state.date}</span>
              </button>
            </div>

            <div class={"dropdown-menu"}>
              <div class="dropdown-content">
                <a class="dropdown-item" onClick={(e) => this.setDate("Today")}>
                  Today
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setDate("Tomorrow")}
                >
                  Tomorrow
                </a>
                <a
                  class="dropdown-item"
                  onClick={(e) => this.setDate("Day After Tomorrow")}
                >
                  Day After Tomorrow
                </a>
              </div>
            </div>
          </div>
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
                  <div className="shows">
                    <div
                      className="show"
                      onClick={(e) =>
                        this._selectShow(
                          movie,
                          this.state.date,
                          "12PM",
                          this.state.theatre
                        )
                      }
                    >
                      12 PM
                    </div>
                    <div
                      className="show"
                      onClick={(e) =>
                        this._selectShow(
                          movie,
                          this.state.date,
                          "4PM",
                          this.state.theatre
                        )
                      }
                    >
                      4 PM
                    </div>
                    <div
                      className="show"
                      onClick={(e) =>
                        this._selectShow(
                          movie,
                          this.state.date,
                          "9PM",
                          this.state.theatre
                        )
                      }
                    >
                      9 PM
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movies,
});

export default connect(mapStateToProps, { selectShow })(Movies);
