// Native modules import
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// Personal modules import
import { signin, logUserIn } from "../../logic/auth/index";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    redirection: false,
  };

  signinForm = (email, password) => {
    return (
      <form action="">
        <div className="form-group">
          <label htmlFor="Email" className="text-muted lead" style={{fontWeight: "bold"}}>
            E-mail
          </label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            name="email"
            className="form-control"
            value={email}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password" className="text-muted lead" style={{fontWeight: "bold"}}>
            Mot de passe
          </label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            name="password"
            className="form-control"
            value={password}
            required
          />
        </div>
        <button
          onClick={this.signinSubmit}
          type="submit"
          className="btn btn-raised btn-primary"
        >
          Entrer dans la Taverne
        </button>
      </form>
    );
  };

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
    });
    this.setState({
      [name]: event.target.value,
    });
  };

  signinSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { email, password } = this.state;
    const user = { email, password };
    if ("" !== email && "" !== password) {
      let response;
      try {
        response = await signin(user);
      } catch (error) {
        console.error(`Couldn't retrieve data using signin method.`);
      }
      if (response.error) {
        this.setState({
          loading: false,
          error: response.error,
        });
      } else {
        logUserIn(response, () => {
          this.setState({
            redirection: true,
          });
        });
      }
    } else {
      this.setState({
        loading: false,
        error: `Tu dois renseigner un e-mail et un mot de passe, sacrebleu !`,
      });
    }
  };

  render() {
    const { email, password, error, redirection, loading } = this.state;
    if (redirection) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        {loading ? (
          <div
            className="jumbotron"
            style={{
              margin: "0",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vw",
              width: "100vw",
            }}
          >
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Chargement...
            </h3>
          </div>
        ) : (
          <div className="container jumbotron">
            <h2 className="mt-5 mb-2 text-center">Bienvenue, moussaillon !</h2>
            <p className="lead mb-5 text-center">Connecte-toi pour accéder aux fonctionnalités du site !</p>

            <div
              className="alert alert-warning"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            {this.signinForm(email, password)}
            <button className="btn btn-raised btn-danger btn-sm">
              <Link to="/forgot-password" className="text" style={{color: "#ffffff"}}>
                Mot de passe oublié
              </Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Signin;
