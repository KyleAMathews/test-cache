const { run } = require(`shakespeares-monkeys`)
const fs = require(`fs-extra`)
const { execSync } = require(`child_process`)
const util = require(`util`)

async function createOperator(id) {
  console.log(`createOperator`, id)
  const newValue = Math.random()
  await fs.outputFile(
    `./src/pages/s-${id}.js`,
    `import * as React from "react"
    export default function Component () {
      return <div id="title">${newValue}</div>
    }
`
  )

  execSync(`git add .`)
  execSync(`git c -m "Added src/pages/s-${id}.js"`)
  execSync(`git push`)

  return {
    selector: `#title`,
    pagePath: `/s-${id}/`,
    value: newValue.toString(),
  }
}

async function deleteOperator(id) {
  await fs.unlink(`./src/pages/s-${id}.js`)

  execSync(`git add .`)
  execSync(`git c -m "Deleted src/pages/s-${id}.js"`)
  execSync(`git push`)

  return
}

const config = {
  rootUrl: `https://testcachemain.gatsbyjs.io/`,
  operators: {
    create: createOperator,
    delete: deleteOperator,
  },
  operationsLimit: 6,
  interval: 10,
}

run(config, (state) => {
  console.log(`event: `, state.event.type)
  if (state.changed) {
    console.log(
      state.value,
      `operations`,
      state.context.operatons?.map((op) => {
        return { value: op.state.value, latency: op.state.context.latency }
      }),
      `nodes`,
      util.inspect(state.context.nodes, false, null, true)
    )
  }
})
