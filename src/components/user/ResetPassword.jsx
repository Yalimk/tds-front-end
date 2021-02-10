// Native modules import
import React, { Component } from "react";

// Personal modules import
import { resetPassword } from "../../logic/auth/index";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    message: "",
    error: "",
  };

  handleChange = (name) => (event) => {
    const newPassword = event.target.value;
    this.setState({
      newPassword: newPassword,
      error: "", 
      message: "" 
    });
  };

  startResetProcess = async (event) => {
    event.preventDefault();
    this.setState({ message: "", error: "" });
    try {
      console.info(
        `[front-end/src/user/ResetPassword => startResetProcess:21] : newPassword (avant le fetch): ${this.state.newPassword}`
      );
      console.info(
        `[front-end/src/user/ResetPassword => startResetProcess:24] : this.props.match.params.resetPasswordToken (avant le fetch): ${this.props.match.params.resetPasswordToken}`
      );
      const data = await resetPassword({
        newPassword: this.state.newPassword,
        resetPasswordLink: this.props.match.params.resetPasswordToken,
      });
      // console.log(`[front-end/src/user/ResetPassword => startResetProcess:30] : data: ${data}`);
      if (data.error) {
        console.error(
          `[front-end/src/user/ResetPassword => startResetProcess:34] : data.error: ${JSON.stringify(data.error)}`
        );
        this.setState({ error: data.error, newPassword: "" });
      } else {
        console.info(
          `[front-end/src/user/ResetPassword => startResetProcess:39] : data.message: ${JSON.stringify(data.message)}`
        );
        this.setState({ message: data.message, newPassword: "", redirectionSignIn: true });
      }
    } catch (error) {
      console.error(`Password couldn't be reset because of error: ${error}`);
    }
  };

  render() {
    const { newPassword, message, error } = this.state;
    // console.log(`[front-end/src/user/ResetPassword => render:57] : message: ${JSON.stringify(message)}`)
    // console.log(`[front-end/src/user/ResetPassword => render:58] : error: ${(JSON.stringify(error))}`)
    // console.log(`[front-end/src/user/ResetPassword => render:60] : newPassword: ${newPassword}`)

    return (
      <div className="container jumbotron">
        <h2 className="mt-5 mb-5">Modification du mot de passe</h2>

        {message && <h5 className="alert alert-success">{message}</h5>}
        {error && <h5 className="alert alert-danger">{error}</h5>}

        <form>
          <div className="form-group mt-5">
            <input
              type="password"
              className="form-control"
              placeholder="Choisis ton nouveau mot de passe... et tâche de le noter cette fois-ci, mille sabords !"
              value={newPassword}
              name="newPassword"
              onChange={this.handleChange("newPassword")}
              autoFocus
            />
          </div>
          <button
            onClick={this.startResetProcess}
            className="btn btn-raised btn-primary"
          >
            Modifier le mot de passe
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
