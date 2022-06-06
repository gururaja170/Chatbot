import React, { Component } from "react";
import Joi from "joi";
import Input from "./../common/Input";
import Select from "../common/Select";
import {
  getUnAnsweredFaqs,
  saveFaq,
  updateFaq,
} from "../../services/faqService";
import { getSubCategories } from "../../services/subCategoriesService";

class Admin extends Component {
  state = {
    faq: {
      category: "",
      subCategory: "",
      question: "",
      answer: "",
    },
    errors: {},
    categories: [],
    subCategories: [],
    isAnswerMode: false,
    unAnsweredQuestions: [],
  };

  schema = Joi.object({
    category: Joi.string().required().label("Category"),
    subCategory: Joi.string().empty("").label("subCategory"),
    question: Joi.string().required().label("Question"),
    answer: Joi.string().required().label("Answer"),
  });

  validateAll = () => {
    const faq = { ...this.state.faq };
    const errors = {};
    const { error } = this.schema.validate(faq, { abortEarly: false });
    if (!error) return null;
    for (let err of error.details) {
      errors[err.path[0]] = err.message;
    }
    return errors;
  };

  handleChange = async ({ currentTarget: input }) => {
    const faq = { ...this.state.faq };
    faq[input.name] = input.value;
    if (input.name === "category") {
      let subCategories = [];
      if (input.value === "profile") {
        subCategories = [
          {
            _id: "kyc-done",
            name: "Kyc Done",
          },
          {
            _id: "kyc-pending",
            name: "Kyc Pending",
          },
        ];
      } else if (input.value === "faq") {
        subCategories = [
          {
            _id: "login",
            name: "Login",
          },
          {
            _id: "register",
            name: "Register",
          },
        ];
      } else {
        subCategories = await getSubCategories(input.value);
      }
      this.setState({ subCategories });
    }
    this.setState({ faq });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateAll();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      if (this.state.isAnswerMode) {
        await updateFaq({
          ...this.state.faq,
          isLeafNode: this.state.faq.subCategory.length > 0,
          isAnswered: true,
        });
      } else {
        await saveFaq({
          ...this.state.faq,
          isLeafNode: this.state.faq.subCategory.length > 0,
          isAnswered: true,
        });
      }
      this.setState({
        faq: {
          category: "",
          subCategory: "",
          question: "",
          answer: "",
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.category = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleAnswerMode = () => {
    const isAnswerMode = this.state.isAnswerMode;
    this.setState({ isAnswerMode: !isAnswerMode });
  };
  async componentDidMount() {
    const categories = [
      {
        _id: "gold",
        name: "Gold",
      },
      {
        _id: "stocks",
        name: "Stocks",
      },
      {
        _id: "fd",
        name: "Fixed-Deposits",
      },
      {
        _id: "mf",
        name: "Mutual-Funds",
      },
      {
        _id: "faq",
        name: "Faq",
      },
      {
        _id: "profile",
        name: "Profile",
      },
    ];
    const unAnsweredQuestions = await getUnAnsweredFaqs();
    this.props.onRender("faq", "faq");
    this.setState({ categories, unAnsweredQuestions });
  }

  render() {
    const {
      faq,
      errors,
      categories,
      subCategories,
      isAnswerMode,
      unAnsweredQuestions,
    } = this.state;
    if (this.props.user && !this.props.user.isAdmin) return null;
    return (
      <div className="position-absolute translate-middle top-50 start-50 w-50">
        <div className="d-flex mb-5 gap-5 align-items-center">
          <h3>{isAnswerMode ? "Answer an FAQ" : "Add an FAQ"}</h3>
          {unAnsweredQuestions.length ? (
            <button
              className="btn btn-success ms-auto w-25"
              onClick={this.handleAnswerMode}
            >
              {isAnswerMode ? "Add FAQ" : "Answer Tickets"}
            </button>
          ) : null}
        </div>
        <form onSubmit={this.handleSubmit}>
          <Select
            name="category"
            label="Category"
            error={errors.category}
            options={categories}
            onChange={this.handleChange}
            value={faq.category}
          />
          <Select
            name="subCategory"
            label="Sub Category"
            error={errors.subCategory}
            options={subCategories}
            onChange={this.handleChange}
            value={faq.subCategory}
          />
          {isAnswerMode ? (
            <Select
              name="question"
              label="Questions"
              error={errors.question}
              options={unAnsweredQuestions}
              onChange={this.handleChange}
              value={faq.question}
            />
          ) : (
            <Input
              name="question"
              value={faq.question}
              error={errors.question}
              onChange={this.handleChange}
              label="Question"
            />
          )}
          <Input
            name="answer"
            value={faq.answer}
            error={errors.answer}
            onChange={this.handleChange}
            label="Answer"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Admin;
