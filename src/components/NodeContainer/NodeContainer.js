import React, { useState } from "react";
import styled from "styled-components";
import NodeList from "../NodeList/NodeList";

const initialNode = {
  node: {
    id: 0,
    title: "Some Text Title",
    content: "Some Text Content",
    size: {
      x_pos: 125,
      y_pos: 125
    },
    position: {
      x_pos: 250,
      y_pos: 250
    }
  }
};

const Box = styled.div`
  min-height: 200vh;
  width: 200vw;
  position: absolute;
  background-color: #eee;
  transform: translate(0px, 0px) translate(-50%, -50%) scale(1);
  transition: scale 3s;
  cursor: grab;
  background-color: #ccc;
  touch-action: none;
  overflow: hidden;
  &.dragActive {
    cursor: grabbing !important;
  }
`;

const OuterBox = styled.div`
  min-height: 200vh;
  width: 200vw;
  position: relative;
  background-color: #333;
  overflow: hidden;
`;
const NodeContainer = () => {
  // initial node state
  const [nodeList, setNodeList] = useState([initialNode]);

  // wheel state
  const [wheelScale, setWheelScale] = useState(1);
  const [getPreviousWheel, setGetPreviousWheel] = useState(1);

  // drag state
  const [containerHasCapture, setContainerHasCapture] = useState(false);
  const [isContainerDragging, setIsContainerDragging] = useState(false);
  const [NodeContainerLeft, setNodeContainerLeft] = useState(0);
  const [NodeContainerTop, setNodeContainerTop] = useState(0);
  const [previousLeft, setPreviousLeft] = useState(0);
  const [previousTop, setPreviousTop] = useState(0);
  const [GetTranslateOrigin, setGetTranslateOrigin] = useState({ x: 0, y: 0 });

  // translate-left-top holder
  const [NodeContainerLeftHolder, setNodeContainerLeftHolder] = useState(0);
  const [NodeContainerTopHolder, setNodeContainerTopHolder] = useState(0);

  const [containerMousePositionLeft, setContainerMousePositionLeft] = useState(
    0
  );
  const [containerMousePositionTop, setContainerMousePositionTop] = useState(0);

  const CreateNode = e => {
    if (e.currentTarget === e.target) {
      const NewNode = {
        node: {
          id: nodeList.length + 1,
          title: "Blank Title",
          content: "Blank Content",
          position: {
            x_pos: e.pageX - 125 / 2,
            y_pos: e.pageY - 125 / 2
          }
        }
      };

      setNodeList([...nodeList, NewNode]);
    }
  };

  const HandleScroll = e => {
    const getContainer = document.getElementById("container");
    const { left, top } = extractContainerPosition(e);
    getContainer.addEventListener("wheel", event => {
      event.preventDefault();
    });

    const delta = extractWheelPosition(e);
    const upperLimit = 10;
    const lowerLimit = 0.1;
    const CurrentScale = wheelScale;
    setWheelScale(delta);

    var xLeft = NodeContainerLeft + left;
    var yTop = NodeContainerTop + top;
    console.log(delta);
    getContainer.style.transformOrigin = `${containerMousePositionTop}px ${containerMousePositionLeft}px`;
    getContainer.style.transform = `translate(${xLeft}px, ${yTop}px) translate(-50%, -50%) scale(${wheelScale})`;
  };

  const extractWheelPosition = e => {
    var delta;
    const deltaY = e.deltaY;

    if (deltaY < 0 && getPreviousWheel > 0.001) {
      delta = getPreviousWheel - 0.055;
    } else if (deltaY > 0 && getPreviousWheel < 5) {
      delta = getPreviousWheel + 0.055;
    } else {
      console.log("something went awry");
    }

    setGetPreviousWheel(delta);

    return delta;
  };

  /* 
Drag Section
*/

  const onMouseDownContainer = e => {
    e.stopPropagation();
    const getContainer = document.getElementById("container");
    getContainer.classList.add("dragDocumentActive");
  };

  const onContainerDown = e => {
    e.stopPropagation();
    setIsContainerDragging(true);
    const getContainer = document.getElementById("container");
    getContainer.classList.add("dragDocumentActive");
    getContainer.setPointerCapture(e.pointerId);

    extractContainerPosition(e);
  };

  const onContainerMove = e => {
    e.stopPropagation();
    if (!isContainerDragging) {
      return;
    }
    const getContainer = document.getElementById("container");
    const { left, top } = extractContainerPosition(e);
    setContainerMousePositionTop(top);
    setContainerMousePositionLeft(left);

    setNodeContainerTop(NodeContainerTop + top);
    setNodeContainerLeft(NodeContainerLeft + left);
    var xLeft = NodeContainerLeft + left;
    var yTop = NodeContainerTop + top;
    getContainer.style.transform = `translate(${xLeft}px, ${yTop}px) translate(-50%, -50%) scale(${wheelScale})`;
  };

  const onContainerUp = e => {
    e.stopPropagation();
    const getContainer = document.getElementById("container");

    getContainer.classList.remove("dragDocumentActive");
    setIsContainerDragging(false);

    const { left, top } = extractContainerPosition(e);
    getContainer.addEventListener("mouseup", event => {
      event.stopPropagation();
    });
  };

  const onGotContainerCapture = e => setContainerHasCapture(true);
  const onContainerLostCapture = e => setContainerHasCapture(false);

  const extractContainerPosition = e => {
    const left = e.pageX;
    const top = e.pageY;

    const delta = {
      left: left - previousLeft,
      top: top - previousTop
    };
    setPreviousTop(top);
    setPreviousLeft(left);
    setGetTranslateOrigin({ x: left, y: top });

    return delta;
  };

  return (
    <OuterBox>
      <Box
        id="container"
        style={{
          left: "50%",
          top: "50%"
        }}
        onMouseDown={e => onMouseDownContainer(e)}
        onPointerDown={e => onContainerDown(e)}
        onPointerMove={e => onContainerMove(e)}
        onPointerUp={e => onContainerUp(e)}
        onPointerCancel={e => onContainerUp(e)}
        onGotPointerCapture={e => onGotContainerCapture(e)}
        onLostPointerCapture={e => onContainerLostCapture(e)}
        onDoubleClick={e => CreateNode(e)}
        onWheel={e => HandleScroll(e)}
      >
        <NodeList AllNodes={nodeList} scaleFactor={wheelScale}></NodeList>
      </Box>
    </OuterBox>
  );
};

export default NodeContainer;
