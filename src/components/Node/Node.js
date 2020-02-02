import React, { useState } from "react";
import styled, { css } from "styled-components";

const SingleNode = styled.div`
  width: 125px;
  height: 125px;
  position: absolute;

  left: ${({ circleLeft }) => (circleLeft ? circleLeft + "px" : "0")};
  top: ${({ circleTop }) => (circleTop ? circleTop + "px" : "0")};
  cursor: grab;
  background-color: blue;
  touch-action: none;
  background-color: ${({ on_drag }) => (on_drag ? "#fff" : "#fff")};

  box-shadow: ${({ on_drag }) =>
    on_drag ? "rgba(51, 51, 51, 0.3) 1px 3px 12px 2px;" : "0"};

  transform: ${({ scaleFactor }) =>
    scaleFactor
      ? "translate(-50%, -50%) scale(" + scaleFactor + ")"
      : "translate(-50%, -50%) scale(1)"};
  &.dragActive {
    cursor: grabbing !important;
  }

  ${props => props.is_node_open && NodeOpened}
`;

const NodeOpened = css`
  width: 500px;
  height: 500px;
`;

const Node = props => {
  const { PosLeft, PosTop, title, content, id, scaleFactor } = props;

  const [hasCapture, setHasCapture] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [circleLeft, setCircleLeft] = useState(PosLeft);
  const [circleTop, setCircleTop] = useState(PosTop);
  const [previousLeft, setPreviousLeft] = useState(0);
  const [previousTop, setPreviousTop] = useState(0);
  const [nodeOpened, setNodeOpened] = useState(false);
  const [handleContentChange, setHandleContentChange] = useState("");

  const onMouseDown = e => {
    e.stopPropagation();
    e.target.classList.add("dragActive");
  };

  const onMouseUp = e => {
    e.stopPropagation();
    e.target.classList.remove("dragActive");
  };

  const onDown = e => {
    e.stopPropagation();
    setIsDragging(true);
    e.target.classList.add("dragActive");
    e.target.setPointerCapture(e.pointerId);
    extractPositionDelta(e);
  };

  const onMove = e => {
    e.stopPropagation();
    if (!isDragging) {
      return;
    }
    const { left, top } = extractPositionDelta(e);
    setCircleTop(circleTop + top);
    setCircleLeft(circleLeft + left);
    e.target.style.left = circleLeft + left + "px";
    e.target.style.top = circleTop + top + "px";
  };

  const onUp = e => {
    e.stopPropagation();
    e.target.classList.remove("dragActive");
    setIsDragging(false);
  };

  const onGotCapture = e => setHasCapture(true);
  const onLostCapture = e => setHasCapture(false);

  const extractPositionDelta = e => {
    e.stopPropagation();
    const left = e.pageX;
    const top = e.pageY;

    const delta = {
      left: left - previousLeft,
      top: top - previousTop
    };
    setPreviousTop(top);
    setPreviousLeft(left);

    return delta;
  };

  const HandleDoubleClick = e => {
    setNodeOpened(!nodeOpened);
  };

  const HandleChange = e => {
    setHandleContentChange(e.target.value);
  };

  return (
    <SingleNode
      key={id}
      data-node={id}
      onMouseDown={e => onMouseDown(e)}
      onMouseUp={e => onMouseUp(e)}
      onPointerDown={e => onDown(e)}
      onPointerMove={e => onMove(e)}
      onPointerUp={e => onUp(e)}
      onPointerCancel={e => onUp(e)}
      onGotPointerCapture={e => onGotCapture(e)}
      onLostPointerCapture={e => onLostCapture(e)}
      circleTop={PosTop}
      circleLeft={PosLeft}
      is_node_open={nodeOpened}
      on_drag={isDragging}
      scaleFactor={props.scaleFactor}
      onDoubleClick={e => HandleDoubleClick(e)}
    >
      {nodeOpened && (
        <div>
          <input
            onChange={e => HandleChange(e)}
            placeholder={handleContentChange}
          ></input>
        </div>
      )}
    </SingleNode>
  );
};

export default Node;
