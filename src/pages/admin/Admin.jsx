// Native modules import
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Components import
import Posts from "../post/Posts";
import Users from "../user/Users";

// Personal modules import
import {isLoggedIn} from '../../logic/auth/index';

class AdminInterface extends Component {
  state = {
    redirectionHome: false,
  };

  componentDidMount() {
    if (isLoggedIn().user.right !== 'Roi des Pirates') {
      this.setState({ redirectionHome: true })
    }
  };

  render() {
    const {redirectionHome} = this.state;

    if (redirectionHome) {
      <Redirect to="/" />
    };

    return (
      <div>
        <div className="jumbotron">
          <h2 className="text-center">Planque du Roi des Pirates</h2>
          <p className="lead text-justify">
            Ici, vous avez tous les pouvoirs, mouhahahahaha ! *tousse*
            Plus sérieusement, tu es ici dans le panneau d'aministration du site.
            Si tu es ici, c'est qu'apparemment quelqu'un te pensait digne...
            Bref, laissons de côté les considérations subjectives un instant.
            Tu peux ici TOUT VOIR, TOUT MODIFIER et TOUT SUPPRIMER !

            N'oublie pas, Roi des Pirates, que comme le disait à juste titre 
            l'oncle Ben dans Spiderman : "Un grand pouvoir implique de grandes responsabilités."
          </p>
        </div>
        <div className="container-fluid jumbotron">
          <div className="row">
            <div className="col-md-6 text-center">
              <h2>Tous les messages des Pirates</h2>
              <hr />
              <Posts />
              <hr />
            </div>
            <div className="col-md-6 text-center">
              <h2>Tous les Pirates (tes sujets)</h2>
              <hr />
              <Users />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminInterface;
