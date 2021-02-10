// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Personal modules import
import { isLoggedIn, signout } from "../../logic/auth/index";
import { remove } from "../../logic/user/apiUser";

class DeleteUser extends Component {
  state = {
    redirectionSignIn: false,
    allMighty: false,
  };

  componentDidMount() {
    if (isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE) {
      this.setState({ allMighty: true });
    }
  };

  deleteAccount = async () => {
    const token = isLoggedIn().token;
    const userId = this.props.userId;
    try {
      const response = await remove(userId, token);
      if (response.error) {
        console.error(
          `An error occured during account deletion: ${response.error}.`
        );
      } else {
        if (!isLoggedIn().user.right === 'Roi des Pirates') {
          signout(() => {
            console.log(`User has been deleted.`);
          });
          this.setState({
            redirectionSignIn: true,
          });
        }
      }
    } catch (error) {
      console.error(
        `Couldn't get a response from server because of error: ${error}.`
      );
    }
  };

  deleteConfirmation = () => {
    let answer, kingAnswer;
    if (isLoggedIn().user.right === process.env.REACT_APP_ADMIN_TITLE) {
      kingAnswer = window.confirm(
        `Tu vas supprimer le profil de ce Pirate de façon irréversible ; même toi tu n'y pourras plus rien, mon Roi.
        Es-tu bien certain que c'est ce que tu veux faire ?`
      );
    } else {
      answer = window.confirm(
        `Tu vas supprimer ton profil de façon TOTALEMENT définitive, moussaillon, tu es sûr ?
         Même le Roi des Pirates n'y pourra plus rien, j'te préviens...`
      );
    }
    if (answer || kingAnswer) {
      this.deleteAccount();
    }
  };

  render() {
    const { redirectionSignIn, allMighty } = this.state;
    const currentUserId = this.props.userId;
    if (redirectionSignIn) {
      return <Redirect to="/signin" />;
    }
    
    if (allMighty && isLoggedIn().user._id !== currentUserId) {
      return (
        <button
          onClick={this.deleteConfirmation}
          className="btn btn-raised btn-dark font-weight-bold"
        >
          Supprimer en tant que Roi
        </button>
      );
    } else {
      return (
        <button
          onClick={this.deleteConfirmation}
          className="btn btn-raised btn-danger"
        >
          Quitter définitivement la Taverne
        </button>
      );
    }
  }
}

export default DeleteUser;
