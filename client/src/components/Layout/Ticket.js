import React, { Component } from "react";
import { connect } from "react-redux";

import { getTicket } from "../../actions/movieActions";
import { CheckCircle } from "react-feather";

class Ticket extends Component {
  state = {
    ticketid: this.props.match.params.id,
    ticket: {},
    movie: "",
  };

  _getTicket = async () => {
    getTicket(
      {
        ticketid: this.state.ticketid,
      },
      (result) => {
        console.log(result);
        if (result.status === "success") {
          this.setState({
            ticket: result.message.ticket,
            movie: result.message.title,
          });
        }
      }
    );
  };

  componentDidMount() {
    this._getTicket();
  }
  render() {
    return (
      <div className="ticket-container">
        {Object.keys(this.state.ticket).length ? (
          <div className="ticket">
            <div className="title">{this.state.movie}</div>
            <div className="tickets">
              <span>
                {"Tickets(" + this.state.ticket.tickets.length + "): "}
              </span>
              {this.state.ticket.tickets.map((t) => {
                return <span>{t + " "}</span>;
              })}
            </div>
            <div className="meta">
              <span className="date">{this.state.ticket.date + ", "}</span>
              <span className="time">{this.state.ticket.time + " at "}</span>
              <span className="date">
                {"Theatre " + this.state.ticket.theatre}
              </span>
            </div>
            <div className="check">
              <CheckCircle />
            </div>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movies,
});

export default connect(mapStateToProps, {})(Ticket);
