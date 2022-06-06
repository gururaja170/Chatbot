import React, { Component } from "react";
import Joi from "joi";
import Input from "../common/Input";
import { saveUser } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    account: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Confirm Password"),
    name: Joi.string().required().label("Name"),
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
      const { headers } = await saveUser(this.state.account);
      loginWithJwt(headers["x-auth-token"]);
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
    this.props.onRender("faq", "register");
  }

  render() {
    const { account, errors } = this.state;
    if (this.props.user) return <Redirect to="/" />;
    return (
      <div className="position-absolute translate-middle top-50 start-50 w-50">
        <form onSubmit={this.handleSubmit}>
          <Input
            type="name"
            name="name"
            value={account.name}
            error={errors.name}
            onChange={this.handleChange}
            label="Name"
          />
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
          <Input
            type="password"
            name="confirmPassword"
            value={account.confirmPassword}
            error={errors.confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
