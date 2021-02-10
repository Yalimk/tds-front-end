// Native modules import
import React, { Component } from "react";

// Personal modules import
import { forgotPassword } from "../../logic/auth/index";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: "",
  };

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
    });
    this.setState({
      [name]: event.target.value,
    });
  };

  forgotPassword = async (event) => {
    event.preventDefault();
    this.setState({
      message: "",
      error: "",
    });
    try {
      const data = await forgotPassword(this.state.email);
      if (data.error) {
        console.log(
          `There is an error with the data retrieved in forgotPassword in ForgotPassword: ${data.error}.`
        );
        this.setState({
          error: data.error,
        });
      } else {
        this.setState({
          message: data.message,
        });
      }
    } catch (error) {
      console.error(
        `The method forgotPassword in ForgotPassword encountered an error of type: ${error}.`
      );
    }
  };

  render() {
    const { email, message, error } = this.state;
    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5">Réinitialisation du mot de passe</h2>

        {message && (
          <h5 className="alert alert-info">{message}</h5>
        )}
        {error && (
          <h5 className="alert alert-danger">{error}</h5>
        )}

        <form>
          <div className="form-group mt-5">
            <input
              type="email"
              className="form-control"
              placeholder="L'adresse e-mail liée à votre compte sur la Taverne des Soiffards."
              value={email}
              name="email"
              onChange={this.handleChange("email")}
              autoFocus
            />
          </div>
          <button
            onClick={this.forgotPassword}
            className="btn btn-raised btn-primary"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
