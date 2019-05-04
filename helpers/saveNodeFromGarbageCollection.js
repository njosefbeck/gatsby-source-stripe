"use strict";

function saveNodeFromGarbageCollection(touchNode, nodeId) {
  touchNode({
    nodeId
  });
}

module.exports = saveNodeFromGarbageCollection;