// Native modules import
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// Personal modules import
import { signup } from "../../logic/auth/index";

class Signup extends Component {
  state = {
    pseudo: "",
    email: "",
    password: "",
    error: "",
    success: false,
  };

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
    });
    this.setState({
      [name]: event.target.value,
    });
  };

  signupForm = (pseudo, email, password) => {
    return (
      <form action="">
        <div className="form-group">
          <label htmlFor="Name" className="text-muted lead" style={{fontWeight: "bold"}}>
            Pseudo
          </label>
          <input
            onChange={this.handleChange("pseudo")}
            type="text"
            className="form-control"
            value={pseudo}
            placeholder="Le nom qui sera visible par les autres utilisateurs de la Taverne"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email" className="text-muted lead" style={{fontWeight: "bold"}}>
            E-mail
          </label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            placeholder="Votre e-mail de contact (example : guy-tard@gmail.com)"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            <em>Votre e-mail est strictement confidentiel et ne sera partagé avec aucune tierce partie</em>
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="Password" className="text-muted lead" style={{fontWeight: "bold"}}>
            Mot de passe
          </label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            placeholder="Ne communiquez jamais votre mot de passe à qui que ce soit."
            required
          />
        </div>
        <button
          onClick={this.signupSubmit}
          type="submit"
          className="btn btn-raised btn-primary"
        >
          S'inscrire
        </button>
      </form>
    );
  };

  signupSubmit = async (event) => {
    event.preventDefault();
    const { pseudo, email, password } = this.state;
    const newUser = { pseudo, email, password };
    let response;
    try {
      response = await signup(newUser);
    } catch (error) {
      console.error(
        `Couldn't get a response, type of response is ${typeof response}.`
      );
    }
    if (response.error) {
      try {
        this.setState({
          error: response.error,
        });
      } catch (error) {
        console.error(`Couldn't change state because of error: ${error}.`);
      }
    } else {
      try {
        this.setState({
          pseudo: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
        // setTimeout(() => {
        //   this.setState({
        //     success: false,
        //   });
        // }, 3000);
      } catch (error) {
        console.error(`Couldn't change state because of error: ${error}.`);
      }
    }
  };

  render() {
    const { pseudo, email, password, error, success } = this.state;
    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5 text-center">Inscription</h2>

        <div
          className="alert alert-warning"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Ton compte vient d'être créé, pirate ! A la <Link to="/signin">Taverne</Link>, maintenant !
        </div>
        {this.signupForm(pseudo, email, password)}
      </div>
    );
  }
}

export default Signup;
