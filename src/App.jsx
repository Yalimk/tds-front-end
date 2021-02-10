// Native modules import
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components import
import Menu from "./components/core/Menu";
import Taverne from "./pages/core/Taverne";
import Users from "./pages/user/Users";
import Signup from "./pages/core/Signup";
import Signin from "./pages/core/Signin";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import Posts from "./pages/post/Posts";
import NewPost from "./pages/post/NewPost";
import OnePost from "./pages/post/OnePost";
import EditPost from "./pages/post/EditPost";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import AdminInterface from "./pages/admin/Admin";
import PrivateRoute from "./components/auth/PrivateRoute";

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path="/" component={Taverne} />
      <PrivateRoute exact path="/admin" component={AdminInterface} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
      <Route exact path="/users" component={Users} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <PrivateRoute exact path="/post/:postId" component={OnePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default App;
