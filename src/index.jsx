import _ from "lodash";
import * as ReactDOM from "react-dom";
import * as React from "react";
import * as style from "./style.css"; // eslint-disable-line no-unused-vars

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack", "update"], " ");

  return element;
}

document.body.appendChild(component());

const Index = () => {
  return <div>Welcome to React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));

// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}
