/* eslint-disable no-lone-blocks */
// Native modules import
import React, { Component } from "react";
import PropTypes from "prop-types";

// Personal modules import
import { isLoggedIn } from "../../logic/auth/index";
import SoTWP from "../../images/sot-wp.jpg";

class ChatForm extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  };
  state = {
    message: "",
  };

  render() {
    if (isLoggedIn()) {
      return (
        <div className="container jumbotron" style={{ padding: "32px 32px" }}>
          <div className="row">
            <div className="col-md-12 mt-3 mb-3">
              <h4 className=" text-center" style={{ fontWeight: "bold" }}>
                Bienvenue dans la Taverne, {isLoggedIn().user.pseudo}
              </h4>
            </div>

            <form
              action=""
              onSubmit={(event) => {
                event.preventDefault();
                this.props.onSubmitMessage(this.state.message);
                this.setState({ message: "" });
              }}
              className="form-control jumbotron text-center"
              style={{ padding: "32px 32px" }}
            >
              <div className="container row d-flex flex-row">
                <div className="col text-center">
                  <input
                    type="text"
                    placeholder={`Ecris ici ce que tu as à dire, ${
                      isLoggedIn().user.pseudo
                    }...`}
                    value={this.state.message}
                    style={{ width: "444px", height: "42px" }}
                    onChange={(event) =>
                      this.setState({ message: event.target.value })
                    }
                  />
                  <button
                    className="btn btn-primary font-weight-bold lead btn-lg"
                    type="submit"
                    style={{boxShadow: "2px 2px 3px grey", color: "#81A65D" }}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container jumbotron" style={{ padding: "0px 32px" }}>
          <div className="row">
            <div className="col-md-12 mt-5 mb-5">
              <h4 className=" text-center" style={{ fontWeight: "bold" }}>
                Bienvenue dans la Taverne, pirate !
              </h4>
              <img
                src={`${SoTWP}`}
                alt="wall-paper-sea-of-thieves"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "auto",
                  maxHeight: "auto",
                  boxShadow: "3px 3px 10px grey",
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ChatForm;
