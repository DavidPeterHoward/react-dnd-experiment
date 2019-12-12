import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import SingleNode from "../Node/Node";

const NodeListContainer = styled.div`
  position: relative;
`;

const NodeList = props => {
  // const [nodeList, setNodeList] = useState([initialNode]);
  const { AllNodes, scaleFactor } = props;
  return AllNodes.map(el => {
    return (
      <NodeListContainer>
        <SingleNode
          key={el.node.id}
          title={el.node.title}
          content={el.node.content}
          PosLeft={el.node.position.x_pos}
          PosTop={el.node.position.y_pos}
          scaleFactor={scaleFactor}
        />
      </NodeListContainer>
    );
  });
};

export default NodeList;
