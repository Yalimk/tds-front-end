import React from "react";

const messageLayout = ({ pseudo, message }) => (
  <div className="container col col-md-12">
    <div className="container row row-12">
      <p className="text-center">
        <strong>{pseudo}</strong>: <em>{message}</em>
      </p>
    </div>
  </div>
);

export default messageLayout;
