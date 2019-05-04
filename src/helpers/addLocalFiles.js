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
    const localFiles =
      nodeWithLocalFiles[fileNodeId.location].localFiles___NODE;
    if (localFiles) {
      nodeWithLocalFiles[fileNodeId.location].localFiles___NODE.concat(
        fileNodeId.id
      );
    }
    nodeWithLocalFiles[fileNodeId.location].localFiles___NODE = [fileNodeId.id];
  });

  return nodeWithLocalFiles;
}

module.exports = addLocalFiles;
