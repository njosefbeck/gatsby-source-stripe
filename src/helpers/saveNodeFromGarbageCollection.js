function saveNodeFromGarbageCollection(touchNode, getNode, nodeId) {
  touchNode(getNode(nodeId));
}

module.exports = saveNodeFromGarbageCollection;
