import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Navbar from "./components/utils/Navbar";
import Home from "./components/utils/Home";
import NotFound from "./components/utils/NotFound";

import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

import Stocks from "./components/products/Stocks";
import StockDesc from "./components/products/StockDesc";
import MutualFunds from "./components/products/MutualFunds";
import FixedDeposits from "./components/products/FixedDeposits";
import Gold from "./components/products/Gold";

import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

import ChatBot from "./components/chatBot/ChatBot";
import ChatbotButton from "./components/chatBot/ChatbotButton";

import Admin from "./components/admin/Admin";

import { getCurrentUser } from "./services/authService";
import { getUser, updateKyc } from "./services/userService";
import { getStocks } from "./services/stockService";

class App extends Component {
  state = {
    displayChatbot: false,
    user: null,
    currentPage: "faq",
    subCategory: "faq",
    stocks: [],
  };

  async componentDidMount() {
    let user = getCurrentUser();
    user = await getUser(user);
    const stocks = await getStocks();
    this.setState({ user, stocks });
  }

  toggleChatbot = () => {
    const displayChatbot = this.state.displayChatbot;
    this.setState({ displayChatbot: !displayChatbot });
  };

  handleKyc = async () => {
    const user = await updateKyc(this.state.user);
    this.setState({ user });
  };

  handlePage = (currentPage, subCategory) => {
    this.setState({ currentPage, subCategory });
  };

  render() {
    const { displayChatbot, user, currentPage, stocks, subCategory } =
      this.state;
    return (
      <div>
        <Navbar user={user} />
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Home onRender={this.handlePage} {...props} />}
            />
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login onRender={this.handlePage} user={user} {...props} />
              )}
            />
            <Route
              path="/register"
              exact
              render={(props) => (
                <Register onRender={this.handlePage} user={user} {...props} />
              )}
            />
            <Route
              path="/stocks"
              exact
              render={(props) => (
                <Stocks onRender={this.handlePage} stocks={stocks} {...props} />
              )}
            />
            <Route
              path="/stocks/:id"
              exact
              render={(props) => (
                <StockDesc
                  onRender={this.handlePage}
                  stocks={stocks}
                  {...props}
                />
              )}
            />
            <Route
              path="/mutual-funds"
              exact
              render={(props) => (
                <MutualFunds onRender={this.handlePage} {...props} />
              )}
            />
            <Route
              path="/fixed-deposits"
              exact
              render={(props) => (
                <FixedDeposits onRender={this.handlePage} {...props} />
              )}
            />
            <Route
              path="/gold"
              exact
              render={(props) => <Gold onRender={this.handlePage} {...props} />}
            />
            <Route
              path="/not-found"
              exact
              render={(props) => (
                <NotFound onRender={this.handlePage} {...props} />
              )}
            />
            <Route
              path="/profile"
              exact
              render={(props) => (
                <Profile
                  user={user}
                  handleKycStatus={this.handleKyc}
                  onRender={this.handlePage}
                  {...props}
                />
              )}
            />
            <Route
              path="/admin"
              exact
              render={(props) => (
                <Admin onRender={this.handlePage} user={user} {...props} />
              )}
            />
            <Route path="/logout" exact component={Logout} />
            <Redirect from="/home" to="/" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <div className="position-absolute bottom-0 end-0">
          {displayChatbot && (
            <ChatBot currentPage={currentPage} subCategory={subCategory} />
          )}
          <ChatbotButton onClick={this.toggleChatbot} />
        </div>
      </div>
    );
  }
}

export default App;
