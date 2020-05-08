import AddMonth from "./AddMonth";
import Months from "./Months";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <AddMonth />
      <Months />
    </div>
  )
}

export default Home