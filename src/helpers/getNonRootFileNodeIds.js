function getNonRootFileNodeIds(fileNodeIds) {
  return fileNodeIds.filter(fileNodeId => fileNodeId.location !== 'root')
}

module.exports = getNonRootFileNodeIds;
