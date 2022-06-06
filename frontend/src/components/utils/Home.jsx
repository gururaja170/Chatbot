import React, { useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Home = ({ onRender }) => {
  useEffect(() => {
    onRender("faq", "faq");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const { text } = useTypewriter({
    words: ["Mutual Funds", "Gold", "FDs", "Stocks"],
    loop: 0,
  });
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <h1>
        Invest in <span className="text-success fw-bold">{text}</span>
      </h1>
      <Link className="btn btn-success mt-2" to="/login">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
