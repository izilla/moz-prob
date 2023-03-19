import data from './data/data.json'
import { getSourceDuplicates } from './src/getSourceDuplicates'

let useData = false

if (process.argv.length === 2) {
  console.warn('No arguments provided using data in ./data/data.json')
  useData = true
}

if (useData) {
  console.log(getSourceDuplicates(data))
} else {
  console.info(`Using data from ${process.argv[2]}`)
  const inputData = require(process.argv[2])
  console.log(getSourceDuplicates(inputData))
}
