import React, { Component } from "react";
import { getFaqs } from "../../../services/faqService";
import RaiseTicket from "./RaiseTicket";

class Faqs extends Component {
  state = {
    faqs: [],
  };
  async componentDidMount() {
    const pageId = localStorage.getItem("pageId");
    const subCategory = localStorage.getItem("subCategory");
    if (this.props.faqs) {
      this.setState({ faqs: this.props.faqs });
    } else {
      const faqs = await getFaqs(pageId, subCategory);
      this.setState({ faqs });
    }
  }

  render() {
    const { faqs } = this.state;
    const question = sessionStorage.getItem("ticketQuestion");
    return (
      <div className="flex flex-wrap mt-2">
        {faqs.map((faq) => (
          <button
            key={faq._id}
            className="btn btn-sm rounded-pill mx-2 mb-2 border border-dark bg-success bg-opacity-10 text-start "
            onClick={() => this.props.actionProvider.getFaq(faq)}
          >
            {faq.question}
          </button>
        ))}
        {question && (
          <RaiseTicket
            {...this.props}
            msg="If not Found. Please raise a ticket"
          />
        )}
      </div>
    );
  }
}

export default Faqs;
