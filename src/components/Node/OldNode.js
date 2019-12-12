import React, { Component, useState } from "react";
import styled, { css } from "styled-components";

const SingleNode = styled.div`
  position: absolute;
  min-width: 250px;
  min-height: 250px;
  z-index: 1000;
  background-color: #fff;
  cursor: grab;
  /*   touch-action: none;
  user-select: none; */
  /*   -webkit-user-drag: none; */
  &.dragActive {
    cursor: grabbing !important;
    cursor: url("https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur"),
      all-scroll;
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: -o-grabbing;
    cursor: -ms-grabbing;
    cursor: grabbing;
    &:hover {
      cursor: grabbing !important;
    }
  }
  /*   &.dragActive:active {
    cursor: grabbing !important;
  } */
  &:active {
    cursor: grabbing !important;
    cursor: url("https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur"),
      all-scroll;
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: -o-grabbing;
    cursor: -ms-grabbing;
    cursor: grabbing;
  }
  /*   &:hover {
    cursor: grab !important;
  } */
`;

const Node = props => {
  const [targetShiftX, setShiftX] = useState(0);
  const [targetShiftY, setShiftY] = useState(0);
  const [hasCapture, setHasCapture] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { PosLeft, PosTop, title, content, id } = props;

  const HandleMouseDown = e => {
    // e.target.setPointerCapture(e.pointerId);
    let shiftX = e.clientX - e.target.getBoundingClientRect().left;
    let shiftY = e.clientY - e.target.getBoundingClientRect().top;
    setShiftX(shiftX);
    setShiftY(shiftY);
    /*     e.target.style.left = e.pageX - targetShiftX + "px";
    e.target.style.top = e.pageY - targetShiftY + "px"; */
    // document.addEventListener("mousemove", onMouseMove);

    /*     moveAt(e.pageX, e.pageY);

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    } */

    /*     function moveAt(pageX, pageY) {
      e.target.style.left = pageX - shiftX + "px";
      e.target.style.top = pageY - shiftY + "px";
    } */
  };

  /*   const HandleMouseUp = e => {
    e.target.removeEventListener("mousemove");
  }; */

  const HandleDragStart = e => {
    /*     e.preventDefault(); */
    // e.dataTransfer.effectAllowed = "copyMove";
    // console.dir(e);
    // e.target.style.cursor = "grabbing";
    e.dataTransfer.effectAllowed = "copyMove";
    var img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(img, 0, 0);
    console.log("DRAG STARTED");
    e.target.classList.add("dragActive");
    return true;
  };

  const HandleMouseDrag = e => {
    console.log(e.pageX + " : " + e.pageY);
    if (e.pageX === 0 && e.pageY === 0) {
      console.log("shouldn't do a thing");
      return;
    } else {
      e.target.style.left = e.pageX - targetShiftX + "px";
      e.target.style.top = e.pageY - targetShiftY + "px";
      // e.target.style.cursor = "move";
    }
  };

  const HandleDragEnd = e => {
    e.target.style.cursor = "grab";
    console.log(e.pageX + " : " + e.pageY);
    e.target.style.left = e.pageX - targetShiftX + "px";
    e.target.style.top = e.pageY - targetShiftY + "px";
    e.target.classList.remove("dragActive");
  };
  const HandleDragOver = e => {
    // e.stopPropagation();
    e.preventDefault();
    // e.dataTransfer.dropEffect = "copy";
    e.target.style.cursor = "grabbing";
  };

  const HandleDragEnter = e => {
    e.preventDefault();
    // e.dataTransfer.dropEffect = "copy";
    e.target.style.cursor = "grabbing";
  };

  const HandlePointerDown = e => {
    setIsDragging(true);
    e.target.setPointerCapture(e.pointerId);
    // e.target.style.cursor = "grabbing";
    console.log(e.pointerId);
    // e.target.setPointerCapture(e.pointerId)
  };
  const HandlePointerMove = e => {
    // e.target.style.cursor = "grabbing";
  };
  const HandlePointerUp = e => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
    // el.onpointermove = null
    // e.target.releasePointerCapture(e.pointerId)
  };

  const HandleOnGotCapture = e => {
    setHasCapture(true);
  };
  const HandleOnLostCapture = e => {
    setHasCapture(false);
  };

  return (
    <SingleNode
      key={id}
      data-nodeid={id}
      // draggable="true"
      onDragStart={e => HandleDragStart(e)}
      onDragEnd={e => HandleDragEnd(e)}
      onMouseDown={e => HandleMouseDown(e)}
      onDrag={e => HandleMouseDrag(e)}
      onDragEnter={e => HandleDragEnter(e)}
      onDragOver={e => HandleDragOver(e)}
      onPointerDown={e => HandlePointerDown(e)}
      onPointerMove={e => HandlePointerMove(e)}
      onPointerUp={e => HandlePointerUp(e)}
      onGotPointerCapture={e => HandleOnGotCapture(e)}
      onLostPointerCapture={e => HandleOnLostCapture(e)}

      // onMouseUp={e => HandleMouseUp(e)}
      /*       onDragStart={e => HandleDragStart(e)}
      onDrag={e => HandleDrag(e)}
      onDoubleClick={e => HandleDoubleClick(e)}
      onDragEnd={e => {
        HandleDragStop(e);
      }}
      onClick={e => console.dir(e.target)}
      onDoubleClick={e => console.dir(e.target.offsetWidth)} */
      // style={{ transform: `translate3d(${PosLeft}px, ${PosTop}px, 0)` }}
    >
      {content}
    </SingleNode>
  );
};
export default Node;
