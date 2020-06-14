import React, { Component } from "react";
import { connect } from "react-redux";
import { ChevronsLeft } from "react-feather";

class Seats extends Component {
  state = {
    title: "",
    duration: "",
    theatre: "",
    date: "",
    time: "",
    numSeats: 4,
    seats: [],
    tickets: [],
  };

  componentDidMount() {
    const {
      selected_movie,
      selected_time,
      selected_date,
      selected_theatre,
    } = this.props.movies;

    this.fillInSeats();
    this.setState({
      title: selected_movie.title,
      duration: selected_movie.duration,
      date: selected_date,
      time: selected_time,
      theatre: selected_theatre,
    });
  }

  getSeatCode(idx, idy) {
    return String.fromCharCode(idx + 65) + String.fromCharCode(idy + 65);
  }

  getIDfromSeatCode(id) {
    return [id.charCodeAt(0) - 65, id.charCodeAt(1) - 65];
  }

  fillInSeats() {
    // available = 1
    // Blocked = 2
    // Covid = 3
    // Selected = 4
    let seats = [];
    let Nrows = 10;
    let Ncols = 13;
    for (let rows = 0; rows < Nrows; rows++) {
      let rowSeats = [];
      for (let cols = 0; cols < Ncols; cols++) {
        let seat = {
          status: Math.abs(rows - cols) % 2 ? 3 : 1,
          id: this.getSeatCode(rows, cols),
        };
        rowSeats.push(seat);
      }
      seats.push(rowSeats);
    }
    this.setState({ seats });
  }

  getSeatColor(status) {
    switch (status) {
      case 1:
        return "#638fff";
      case 2:
        return "grey";
      case 3:
        return "red";
      case 4:
        return "greenyellow";
    }
  }

  getClassName(status) {
    switch (status) {
      case 1:
        return "available";
      case 2:
        return "block";
      case 3:
        return "covid";
      case 4:
        return "selected";
    }
  }

  parseTickets() {
    let tickets = [];
    for (let row of this.state.seats) {
      for (let seat of row) {
        if (seat.status === 4) {
          tickets.push(seat.id);
        }
      }
    }
    this.setState({ tickets });
  }

  selectSeat(status, id) {
    let seats = this.state.seats,
      location = this.getIDfromSeatCode(id);
    if (status === 1) {
      seats[location[0]][location[1]].status = 4;
    } else if (status === 4) {
      seats[location[0]][location[1]].status = 1;
    }
    this.parseTickets();
    this.setState({ seats: seats });
  }

  renderSeats() {
    const { seats } = this.state;
    if (seats.length) {
      return (
        <div className="seats-grid">
          {seats.map((row) => {
            return (
              <>
                {row.map((seat) => {
                  return (
                    <div
                      className={"seat " + this.getClassName(seat.status)}
                      onClick={(e) => this.selectSeat(seat.status, seat.id)}
                      style={{
                        backgroundColor: this.getSeatColor(seat.status),
                      }}
                    ></div>
                  );
                })}
                <br />
              </>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="seats-container">
        <div className="movie-title">{this.state.title}</div>
        <div className="duration">{this.state.duration + " mins"}</div>
        <div className="meta-data">
          <span className="date">{this.state.date + ", "}</span>{" "}
          <span className="time">{this.state.time + " in "}</span>
          <span className="theatre">{"Theatre " + this.state.theatre}</span>
        </div>
        {this.renderSeats()}
        <div className="bottom-bar">
          <div className="tickets-booked">
            <span>{"Tickets (" + this.state.tickets.length + "): "}</span>
            {this.state.tickets.map((ticket) => {
              return <span>{ticket + " "}</span>;
            })}
          </div>
          <div className="book-button">
            <a
              className={"button is-rounded "}
              disabled={!this.state.tickets.length}
            >
              Book Tickets
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movies,
});

export default connect(mapStateToProps, {})(Seats);
