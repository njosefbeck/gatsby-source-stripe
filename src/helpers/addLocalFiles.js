const getRootFileNodeIds = require("./getRootFileNodeIds");
const getNonRootFileNodeIds = require("./getNonRootFileNodeIds");

function addLocalFiles(node, fileNodeIds) {
  const rootFileNodeIds = getRootFileNodeIds(fileNodeIds);
  const nonRootFileNodeIds = getNonRootFileNodeIds(fileNodeIds);
  const nodeWithLocalFiles = Object.assign(node, {
    localFiles___NODE: rootFileNodeIds
  });

  if (!nonRootFileNodeIds.length) {
    return nodeWithLocalFiles;
  }

  nonRootFileNodeIds.forEach(fileNodeId => {
    nodeWithLocalFiles[fileNodeId.location].localFiles___NODE = [];
  });

  nonRootFileNodeIds.forEach(fileNodeId => {
    nodeWithLocalFiles[fileNodeId.location].localFiles___NODE.push(
      fileNodeId.id
    );
  });

  return nodeWithLocalFiles;
}

module.exports = addLocalFiles;
