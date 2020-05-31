function getRootFileNodeIds(fileNodeIds) {
  return fileNodeIds
    .filter((fileNodeId) => fileNodeId.location === "root")
    .map((rootFileNodeId) => rootFileNodeId.id);
}

module.exports = getRootFileNodeIds;
