import React, { Component } from "react";
import Joi from "joi";
import Input from "../common/Input";
import { Link } from "react-router-dom";
import { login } from "../../services/authService";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  validateAll = () => {
    const account = { ...this.state.account };
    const errors = {};
    const { error } = this.schema.validate(account, { abortEarly: false });
    if (!error) return null;
    for (let err of error.details) {
      errors[err.path[0]] = err.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateAll();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await login(this.state.account);
      window.location.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  componentDidMount() {
    this.props.onRender("faq", "login");
  }

  render() {
    const { account, errors } = this.state;
    if (this.props.user) return <Redirect to="/" />;
    return (
      <div className="position-absolute translate-middle top-50 start-50 w-50">
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="email"
            value={account.email}
            error={errors.email}
            onChange={this.handleChange}
            label="Email address"
          />
          <Input
            type="password"
            name="password"
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
            label="Password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="mt-3">
          If you don't have an account, Register by clicking{" "}
          <Link to="/register">Here</Link>
        </p>
      </div>
    );
  }
}

export default Login;
