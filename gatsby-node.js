exports.sourceNodes = async ({ cache, actions, getNode }) => {
  // Create/update plugin cache value
  let prevValue = (await cache.get(`hi`)) || 0
  if (!prevValue) {
    console.log(`cache doesn't exist`)
  } else {
    console.log(`cache does exist`)
    console.log({ prevValue })
  }

  prevValue += 1
  await cache.set(`hi`, prevValue)

  let node = getNode(`test-cache`)

  let nodeCounter = 0
  if (node) {
    console.log(`before`, { node })
    nodeCounter = node.nodeCounter + 1
  }

  console.log({ nodeCounter: node?.nodeCounter })
  console.log({ nodeCounter })

  actions.createNode({
    id: `test-cache`,
    parent: null,
    children: [],
    nodeCounter,
    internal: {
      contentDigest: nodeCounter.toString(),
      type: `testCache`,
    },
  })

  node = getNode(`test-cache`)

  console.log(`after`, { node })
}
