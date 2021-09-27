const { setTimeout: setTimeoutPromise } = require(`timers/promises`)

exports.sourceNodes = async ({ cache, actions, getNode, store }) => {
  // Create/update plugin cache value
  let pluginCache = (await cache.get(`hi`)) || 0
  console.log({ pluginCache })

  pluginCache += 1
  await cache.set(`hi`, pluginCache)

  // Plugin Status
  const pluginStatus =
    store.getState().status.plugins?.[`default-site-plugin`]?.pluginStatus || 0

  console.log({ pluginStatus })

  actions.setPluginStatus({
    pluginStatus: pluginStatus + 1,
  })

  let node = getNode(`test-cache`)

  let nodeCounter = 0
  if (node) {
    nodeCounter = node.nodeCounter
  }
  console.log({ nodeCounter })

  nodeCounter += 1

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
}

exports.createPages = async () => {
  await setTimeoutPromise(5000)
}
