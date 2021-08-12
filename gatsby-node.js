exports.sourceNodes = async ({cache}) => {
  const prevValue = await cache.get(`hi`)
  if (!prevValue) {
    console.log(`cache doesn't exist`)
  } else {
    console.log(`cache does exist`)
    console.log({prevValue})
  }

  await cache.set(`hi`, Date.now())

}
