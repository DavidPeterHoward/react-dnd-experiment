import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/* import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const CIRCLE_SIZE = 85;

class DragBox extends React.Component {
  state = {
    hasCapture: false,
    circleLeft: 80,
    circleTop: 80
  };
  isDragging = false;
  previousLeft = 0;
  previousTop = 0;

  onMouseDown = e => {
    e.target.classList.add("dragActive");
  };

  onMouseUp = e => {
    e.target.classList.remove("dragActive");
  };

  onDown = e => {
    this.isDragging = true;
    e.target.setPointerCapture(e.pointerId);

    // We store the initial coordinates to be able to calculate the changes
    // later on.
    this.extractPositionDelta(e);
  };

  onMove = e => {
    if (!this.isDragging) {
      return;
    }
    const { left, top } = this.extractPositionDelta(e);

    this.setState(({ circleLeft, circleTop }) => ({
      circleLeft: circleLeft + left,
      circleTop: circleTop + top
    }));
  };

  onUp = e => (this.isDragging = false);
  onGotCapture = e => this.setState({ hasCapture: true });
  onLostCapture = e => this.setState({ hasCapture: false });

  extractPositionDelta = e => {
    const left = e.pageX;
    const top = e.pageY;
    const delta = {
      left: left - this.previousLeft,
      top: top - this.previousTop
    };
    this.previousLeft = left;
    this.previousTop = top;
    return delta;
  };

  render() {
    const { hasCapture, circleLeft, circleTop } = this.state;

    const boxStyle = {
      border: "1px solid #d9d9d9",
      margin: "10px 0 20px",
      minHeight: 400,
      width: "100%",
      position: "relative"
    };

    const circleStyle = {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      position: "absolute",
      left: circleLeft,
      cursor: "grab",
      top: circleTop,
      backgroundColor: hasCapture ? "blue" : "green",
            cursor: hasCapture ? "grabbing" : "grab",
      // cursor: hasCapture ? "grabbing" : null,
      touchAction: "none"
    };

    return (
      <div style={boxStyle}>
        <div
          style={circleStyle}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onPointerDown={this.onDown}
          onPointerMove={this.onMove}
          onPointerUp={this.onUp}
          onPointerCancel={this.onUp}
          onGotPointerCapture={this.onGotCapture}
          onLostPointerCapture={this.onLostCapture}
        />
      </div>
    );
  }
}

ReactDOM.render(<DragBox />, document.getElementById("root"));
 */
