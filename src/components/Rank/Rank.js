import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3 mb3">
        {`${name}, wanna play some homemade FlappyBird? Click!`}
      </div>
    </div>
  );
};

export default Rank;
